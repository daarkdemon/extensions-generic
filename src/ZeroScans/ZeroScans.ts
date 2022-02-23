import {
    ContentRating,
    LanguageCode,
    SourceInfo,
    TagType
} from 'paperback-extensions-common'
import {
    Genkan,
    getExportVersion 
} from '../Genkan'

const ZEROSCANS_DOMAIN = 'https://zeroscans.com'

export const ZeroScansInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'ZeroScans',
    description: 'Extension that pulls manga from zeroscans.com',
    author: 'darkdemon',
    authorWebsite: 'http://github.com/daarkdemon',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: ZEROSCANS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class ZeroScans extends Genkan {

    baseUrl: string = ZEROSCANS_DOMAIN
    languageCode: LanguageCode = LanguageCode.ENGLISH
}
