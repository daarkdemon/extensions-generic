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

const THENONAMESCANS_DOMAIN = 'https://the-nonames.com'

export const TheNonameScansInfo: SourceInfo = {
    version: getExportVersion('0.0.0'),
    name: 'TheNonameScans',
    description: 'Extension that pulls manga from the-nonames.com',
    author: 'darkdemon',
    authorWebsite: 'http://github.com/daarkdemon',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: THENONAMESCANS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class TheNonameScans extends Genkan {

    baseUrl: string = THENONAMESCANS_DOMAIN
    languageCode: LanguageCode = LanguageCode.ENGLISH
}
