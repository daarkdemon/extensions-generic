import {
    Chapter,
    ChapterDetails,
    LanguageCode,
    Manga,
    MangaStatus,
    MangaTile,
} from "paperback-extensions-common";

export class Parser {
    
    parseMangaDetails($: CheerioSelector, mangaId: string,source: any): Manga {
        const title = this.decodeHTMLEntity($("div#content h5").first().text().trim())
        const summary = this.decodeHTMLEntity(($('.col-lg-9').clone().children().remove().end().text()).trim())
        const image = encodeURI(this.getImageSrc($("div.media a").first(), source.baseUrl))
        const views = Number($('.text-white').first().text().trim().split(',').join(''))
        const lastUpdate = source.convertTime($('div.item-date').text().trim())
        let hentai = false

        // If we do not have a valid image, something is wrong with the generic parsing logic. A source should always remedy this with
        // a custom implementation.
        if (!image) {
            throw new Error(`Could not parse out a valid image while parsing manga details for manga: ${mangaId}`)
        }

        return createManga({
            id: mangaId,
            titles: [title],
            author: '',
            image: image,
            desc: summary,
            status: MangaStatus.ONGOING,
            rating:0,
            views: views,
            hentai: hentai,
            lastUpdate: lastUpdate
        })
    }   

    parseChapterList($: CheerioSelector, mangaId: string, source: any): Chapter[] {
        const chapters: Chapter[] = [] 
        let sortingIndex = 0

        // For each available chapter..
        for (const obj of $('div.col-sm-3').toArray()) {
            const id = ($('a.item-author', $(obj)).attr('href') ?? '').replace(`${source.baseUrl}/${source.sourceTraversalPathName}/${mangaId}/`, '').replace(/\/$/, '')
            let volume = Number(id.split('/')[0])
            let chapNum = Number(id.split('/').pop())
            let chapName = $('a.item-author', $(obj)).first().text().trim()
            let releaseDate = source.convertTime($('a.item-company', $(obj)).first().text())

            if (typeof id === 'undefined') {
                throw new Error(`Could not parse out ID when getting chapters for ${mangaId}`)
            }
            chapters.push(createChapter({
                id: id,
                mangaId: mangaId,
                langCode: source.languageCode ?? LanguageCode.UNKNOWN,
                volume: Number.isNaN(volume) ? 0 : volume,
                chapNum: Number.isNaN(chapNum) ? 0 : chapNum,
                name: chapName ? chapName : undefined,
                time: releaseDate,
                // @ts-ignore
                sortingIndex
            }))
            sortingIndex--
        }
        return chapters
    }

    parseChapterDetails($: CheerioSelector, mangaId: string, chapterId: string, source: any): ChapterDetails {
        let scriptObj = $('div#pages-container + script').toArray()
        if (typeof scriptObj[0]?.children[0]?.data === 'undefined') {
            throw(`Could not parse script for ${mangaId}`)
        }
        let allPages = (scriptObj[0]?.children[0]?.data.slice(scriptObj[0]?.children[0]?.data.indexOf('[')+1, scriptObj[0]?.children[0]?.data.lastIndexOf('];'))).replace(/["\\]/g, '').split(',')
        let pages: string[] = []
         
        for (let obj of allPages) {
            let page = encodeURI(obj)
            page = page.startsWith('http') ? page : source.baseUrl + page
            if (!page) {
                throw(`Could not parse page for ${mangaId}/${chapterId}`)
            }
            pages.push(page)
        }

        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages ?? [''],
            longStrip: false
        })
    }

    parseSearchResults($: CheerioSelector, source: any): MangaTile[] {
        const results: MangaTile[] = []
        for (const obj of $('div.col-lg-9 div.flex').toArray()) {
            const id = ($('a', $(obj)).attr('href') ?? '').replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').replace(/\/$/, '')
            const title = createIconText({text: this.decodeHTMLEntity($("div#content h5").first().text().trim())})
            const image = encodeURI(this.getImageSrc($("div.media a").first(), source.baseUrl))

            if (!id || !image || !title.text) {
                if (id.includes(source.baseUrl.replace(/\/$/, ''))) continue
                // Something went wrong with our parsing, return a detailed error
                throw new Error(`Failed to parse searchResult for ${source.baseUrl} using ${source.searchMangaSelector} as a loop selector`)
            }
            results.push(createMangaTile({
                id: id,
                title: title,
                image: image,
            }))
        }
        return results
    }

    parseSearchSection($: CheerioStatic, source: any, collectedIds?: string[]): MangaTile[] {
        return this.parseHomeSection($, source, collectedIds)
    }

    parseHomeSection($: CheerioStatic, source: any, collectedIds?: string[]): MangaTile[] {
        const items: MangaTile[] = []
        if(typeof collectedIds === 'undefined') {
            collectedIds = []
        }
        for (const obj of $('div.list-item.rounded').toArray()) {
            const image = encodeURI(this.getImageSrc($('a.media-content', $(obj)),source.baseUrl) ?? '')
            const title = this.decodeHTMLEntity($('a.list-title', $(obj)).first().text().trim())
            const id = $('a.list-title', $(obj)).attr('href')?.replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').split('/')[0]

            if (!id || !title || !image) {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/`)
            }
            if (!collectedIds.includes(id)) {
                items.push(createMangaTile({
                    id: id,
                    title: createIconText({text: title}),
                    image: image
                }))
                collectedIds.push(id)
            }
        }
        return items
    }

    filterUpdatedManga($: CheerioSelector, time: Date, ids: string[], source: any): { updates: string[], loadNextPage: boolean } {
        let passedReferenceTime = false
        const updatedManga: string[] = []

        for (const obj of $('div.list-item').toArray()) {
            const id = $('a.list-title', $(obj)).attr('href')?.replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').split('/')[0] ?? ''
            let mangaTime: Date = source.convertTime($('.text-muted.text-sm', obj).text() ?? '')

            passedReferenceTime = mangaTime <= time
            if (!passedReferenceTime) {
                if (ids.includes(id)) {
                    updatedManga.push(id)
                }
            } else break

            if (typeof id === 'undefined') {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/`)
            }
        }
        if (!passedReferenceTime) {
            return { updates: updatedManga, loadNextPage: true }
        } else {
            return { updates: updatedManga, loadNextPage: false }
        }

    }

    // UTILITY METHODS

    getImageSrc(imageObj: Cheerio | undefined, baseUrl: string): string {
        let trimmedLink = imageObj?.attr('style')?.split('(')[1]?.split(')')[0]
        let image = baseUrl + trimmedLink
         return encodeURI(decodeURI(this.decodeHTMLEntity(image ?? '')))
    }

    isLastPage($: CheerioSelector): boolean {
        return $('[rel=next]').first().length < 1;
    }

    decodeHTMLEntity(str: string): string {
        return str.replace(/&#(\d+);/g, (_match, dec) => {
            return String.fromCharCode(dec)
        })
    }
}