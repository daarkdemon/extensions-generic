import {
    Chapter,
    ChapterDetails,
    HomeSection,
    LanguageCode,
    Manga,
    MangaTile,
    MangaUpdates,
    PagedResults,
    RequestHeaders,
    SearchRequest,
    Source,
} from "paperback-extensions-common"

import {Parser} from './GenkanParser'

const BASE_VERSION = '1.0.0'
export const getExportVersion = (EXTENSION_VERSION: string): string => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.')
}

export abstract class Genkan extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 3
    })

    /**
     * The Madara URL of the website. Eg. https://webtoon.xyz
     */
    abstract baseUrl: string

    /**
     * The language code which this source supports.
     */
    abstract languageCode: LanguageCode

    /**
     * The path that precedes a manga page not including the Madara URL.
     * Eg. for https://www.webtoon.xyz/read/limit-breaker/ it would be 'read'.
     * Used in all functions.
     */
    sourceTraversalPathName = 'comics'

    /**
     * Different Madara sources might have a slightly different selector which is required to parse out
     * each manga object while on a search result page. This is the selector
     * which is looped over. This may be overridden if required.
     */
    //searchMangaSelector = 'div.c-tabs-item__content'

    /**
     * Set to true if your source has advanced search functionality built in.
     */
    //hasAdvancedSearchPage = false

    /**
     * The path used for search pagination. Used in search function.
     * Eg. for https://mangabob.com/page/2/?s&post_type=wp-manga it would be 'page'
     */
    //searchPagePathName = 'page'

    /**
     * Some sites use the alternate URL for getting chapters through ajax
     */
    //alternativeChapterAjaxEndpoint = false

    /**
     * Different Madara sources might require a extra param in order for the images to be parsed.
     * Eg. for https://arangscans.com/manga/tesla-note/chapter-3/?style=list "?style=list" would be the param
     * added to the end of the URL. This will set the page in list style and is needed in order for the
     * images to be parsed. Params can be addded if required.
     */
    chapterDetailsParam = ''

    /**
     * Different Madara sources might have a slightly different selector which is required to parse out
     * each page while on a chapter page. This is the selector
     * which is looped over. This may be overridden if required.
     */
    //chapterDetailsSelector = 'div.page-break > img'

    /**
    * Helps with CloudFlare for some sources, makes it worse for others; override with empty string if the latter is true
    */
    userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`

    parser = new Parser()

    async getMangaDetails(mangaId: string): Promise<Manga> {
        if (!isNaN(Number(mangaId))) {
            throw new Error('Migrate your source to the same source but make sure to select include migrated manga. Then while it is migrating, press "Mark All" and Replace.')
        }

        const request = createRequestObject({
            url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/`,
            method: 'GET',
            headers: this.constructHeaders()
        })

        const data = await this.requestManager.schedule(request, 1)
        // this.CloudFlareError(data.status)
        const $ = this.cheerio.load(data.data)

        return this.parser.parseMangaDetails($, mangaId,this)
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        if (!isNaN(Number(mangaId))) {
            throw new Error('Migrate your source to the same source but make sure to select include migrated manga. Then while it is migrating, press "Mark All" and Replace.')
        }

        const request = createRequestObject({
            url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/`,
            method: 'GET',
            headers: this.constructHeaders()
        })

        const data = await this.requestManager.schedule(request, 1)
        // this.CloudFlareError(data.status)
        const $ = this.cheerio.load(data.data)

        return this.parser.parseChapterList($, mangaId, this)
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/${chapterId}/`,
            method: 'GET',
            headers: this.constructHeaders(),
        })

        const data = await this.requestManager.schedule(request, 1)
        //this.CloudFlareError(data.status)
        const $ = this.cheerio.load(data.data)
        return this.parser.parseChapterDetails($, mangaId, chapterId, this)
    }

    override async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        // If we're supplied a page that we should be on, set our internal reference to that page. Otherwise, we start from page 0.
        let page: number = 1
        let loadNextPage = true
        while (loadNextPage) {
            const request = createRequestObject({
            url: `${this.baseUrl}/latest?page=${page}`,
                method: 'GET',
                headers: this.constructHeaders()
            })
            const data = await this.requestManager.schedule(request, 1)
            //this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data)

            const updatedManga = this.parser.filterUpdatedManga($, time, ids, this)
            loadNextPage = updatedManga.loadNextPage && !this.parser.isLastPage($)
            if (loadNextPage) {
                page++
            }
            if (updatedManga.updates.length > 0) {
                mangaUpdatesFoundCallback(createMangaUpdates({
                    ids: updatedManga.updates
                }))
            }
        }
        mangaUpdatesFoundCallback(createMangaUpdates({ ids: [] }))
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        // If we're supplied a page that we should be on, set our internal reference to that page. Otherwise, we start from page 0.
        let page = metadata?.page ?? 1

        const request = this.constructSearchRequest( query)
        const data = await this.requestManager.schedule(request, 1)
       //this.CloudFlareError(data.status)
        const $ = this.cheerio.load(data.data)
        const manga = this.parser.parseSearchSection($, this)
        let mData: any = {page: (page + 1)}
        if (this.parser.isLastPage($)) {
            mData = undefined
        }

        return createPagedResults({
            results: manga,
            metadata: typeof mData?.page === 'undefined' ? undefined : mData
        })
    }

    override globalRequestHeaders(): RequestHeaders {
        if (this.userAgentRandomizer !== '') {
            return {
                "referer": `${this.baseUrl}/`,
                "user-agent": this.userAgentRandomizer,
                "accept": "image/avif,image/apng,image/jpeg;q=0.9,image/png;q=0.9,image/*;q=0.8"
            }
        } else {
            return {
                "referer": `${this.baseUrl}/`,
                "accept": "image/avif,image/apng,image/jpeg;q=0.9,image/png;q=0.9,image/*;q=0.8"
            }
        }
    }

    /**
     * It's hard to capture a default logic for homepages. So for Madara sources,
     * instead we've provided a homesection reader for the base_url/source_traversal_path/ endpoint.
     * This supports having paged views in almost all cases.
     * @param sectionCallback
     */
     override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const sections = [
            {
                request: createRequestObject({
                    url: `${this.baseUrl}/latest?page=0`,
                    method: 'GET',
                    headers: this.constructHeaders()
                }),
                section: createHomeSection({
                    id: '0',
                    title: 'RECENTLY UPDATED',
                    view_more: true,
                }),
            },
            {
                request: createRequestObject({
                    url: `${this.baseUrl}/${this.sourceTraversalPathName}?page=0`,
                    method: 'GET',
                    headers: this.constructHeaders()
                }),
                section: createHomeSection({
                    id: '1',
                    title: 'POPULAR',
                    view_more: true,
                })
            }
        ]

        const promises: Promise<void>[] = []

        for (const section of sections) {
            // Let the app load empty sections
            sectionCallback(section.section)

            // Get the section data
            promises.push(
                this.requestManager.schedule(section.request, 1).then(response => {
                    //this.CloudFlareError(response.status)
                    const $ = this.cheerio.load(response.data)
                    section.section.items = this.parser.parseHomeSection($, this)
                    sectionCallback(section.section)
                }),
            )
        }

        // Make sure the function completes
        await Promise.all(promises)
    }

    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        // We only have one homepage section ID, so we don't need to worry about handling that any
        const page = metadata?.page ?? 1   // Default to page 1
        let sortBy = ''
        switch (homepageSectionId) {
            case '0': {
                sortBy = `latest`
                break
            }
            case '1': {
                sortBy = `${this.sourceTraversalPathName}`
                break
            }
        }
        const request = createRequestObject({
            url: `${this.baseUrl}/${sortBy}?page=${page}`,
            method: 'GET',
            headers: this.constructHeaders()
        })
        const data = await this.requestManager.schedule(request, 1)
        //this.CloudFlareError(data.status)
        const $ = this.cheerio.load(data.data)
        let collectedIds: string[] = []
        let items: MangaTile[] = this.parser.parseHomeSection($, this, collectedIds)
        // Set up to go to the next page. If we are on the last page, remove the logic.
        let mData: any = {page: (page + 1)}
        if (this.parser.isLastPage($)) {
            mData = undefined
        }

        return createPagedResults({
            results: items,
            metadata: mData
        })
    }
    
    /** 
     * Constructs requests to be sent to the search page.
     */
     constructSearchRequest(query: SearchRequest): any {
        return createRequestObject({
            url: encodeURI(`${this.baseUrl}/${this.sourceTraversalPathName}?query=${query.title}`),
            method: 'GET',
            headers: this.constructHeaders(),
        })
    }

    /*
     * Parses a time string from a Genkan source into a Date object.
     */
    convertTime(timeAgo: string): Date {
        let time: Date
        let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0])
        trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000)
        } else if (timeAgo.includes('hours') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000)
        } else if (timeAgo.includes('days') || timeAgo.includes('day')) {
            time = new Date(Date.now() - trimmed * 86400000)
        } else if (timeAgo.includes('weeks') || timeAgo.includes('week')) {
            time = new Date(Date.now() - trimmed * 604800000)
        } else if (timeAgo.includes('months') || timeAgo.includes('month')) {
            time = new Date(Date.now() - trimmed * 2548800000)
        } else if (timeAgo.includes('year') || timeAgo.includes('years')) {
            time = new Date(Date.now() - trimmed * 31556952000)
        } else {
            time = new Date(timeAgo)
        }

        return time
    }

    constructHeaders(headers?: any, refererPath?: string): any {
        headers = headers ?? {}
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer
        }
        headers['referer'] = `${this.baseUrl}${refererPath ?? ''}`
        return headers
    }

    /*CloudFlareError(status: any) {
        if (status == 503) {
            throw new Error('CLOUDFLARE BYPASS ERROR:\nPlease go to Settings > Sources > \<\The name of this source\> and press Cloudflare Bypass')
        }
    } */
}