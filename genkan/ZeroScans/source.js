(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genkan = exports.getExportVersion = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const GenkanParser_1 = require("./GenkanParser");
const BASE_VERSION = '1.0.0';
const getExportVersion = (EXTENSION_VERSION) => {
    return BASE_VERSION.split('.').map((x, index) => Number(x) + Number(EXTENSION_VERSION.split('.')[index])).join('.');
};
exports.getExportVersion = getExportVersion;
class Genkan extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 3
        });
        /**
         * The path that precedes a manga page not including the Madara URL.
         * Eg. for https://www.webtoon.xyz/read/limit-breaker/ it would be 'read'.
         * Used in all functions.
         */
        this.sourceTraversalPathName = 'comics';
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
        this.chapterDetailsParam = '';
        /**
         * Different Madara sources might have a slightly different selector which is required to parse out
         * each page while on a chapter page. This is the selector
         * which is looped over. This may be overridden if required.
         */
        //chapterDetailsSelector = 'div.page-break > img'
        /**
        * Helps with CloudFlare for some sources, makes it worse for others; override with empty string if the latter is true
        */
        this.userAgentRandomizer = `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:77.0) Gecko/20100101 Firefox/78.0${Math.floor(Math.random() * 100000)}`;
        this.parser = new GenkanParser_1.Parser();
        /*CloudFlareError(status: any) {
            if (status == 503) {
                throw new Error('CLOUDFLARE BYPASS ERROR:\nPlease go to Settings > Sources > \<\The name of this source\> and press Cloudflare Bypass')
            }
        } */
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isNaN(Number(mangaId))) {
                throw new Error('Migrate your source to the same source but make sure to select include migrated manga. Then while it is migrating, press "Mark All" and Replace.');
            }
            const request = createRequestObject({
                url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/`,
                method: 'GET',
                headers: this.constructHeaders()
            });
            const data = yield this.requestManager.schedule(request, 1);
            // this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data);
            return this.parser.parseMangaDetails($, mangaId, this);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isNaN(Number(mangaId))) {
                throw new Error('Migrate your source to the same source but make sure to select include migrated manga. Then while it is migrating, press "Mark All" and Replace.');
            }
            const request = createRequestObject({
                url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/`,
                method: 'GET',
                headers: this.constructHeaders()
            });
            const data = yield this.requestManager.schedule(request, 1);
            // this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data);
            return this.parser.parseChapterList($, mangaId, this);
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${this.baseUrl}/${this.sourceTraversalPathName}/${mangaId}/${chapterId}/`,
                method: 'GET',
                headers: this.constructHeaders(),
            });
            const data = yield this.requestManager.schedule(request, 1);
            //this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data);
            return this.parser.parseChapterDetails($, mangaId, chapterId, this);
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            // If we're supplied a page that we should be on, set our internal reference to that page. Otherwise, we start from page 0.
            let page = 1;
            let loadNextPage = true;
            while (loadNextPage) {
                const request = createRequestObject({
                    url: `${this.baseUrl}/latest?page=${page}`,
                    method: 'GET',
                    headers: this.constructHeaders()
                });
                const data = yield this.requestManager.schedule(request, 1);
                //this.CloudFlareError(data.status)
                const $ = this.cheerio.load(data.data);
                const updatedManga = this.parser.filterUpdatedManga($, time, ids, this);
                loadNextPage = updatedManga.loadNextPage && !this.parser.isLastPage($);
                if (loadNextPage) {
                    page++;
                }
                if (updatedManga.updates.length > 0) {
                    mangaUpdatesFoundCallback(createMangaUpdates({
                        ids: updatedManga.updates
                    }));
                }
            }
            mangaUpdatesFoundCallback(createMangaUpdates({ ids: [] }));
        });
    }
    getSearchResults(query, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // If we're supplied a page that we should be on, set our internal reference to that page. Otherwise, we start from page 0.
            let page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            const request = this.constructSearchRequest(query);
            const data = yield this.requestManager.schedule(request, 1);
            //this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data);
            const manga = this.parser.parseSearchSection($, this);
            let mData = { page: (page + 1) };
            if (this.parser.isLastPage($)) {
                mData = undefined;
            }
            return createPagedResults({
                results: manga,
                metadata: typeof (mData === null || mData === void 0 ? void 0 : mData.page) === 'undefined' ? undefined : mData
            });
        });
    }
    globalRequestHeaders() {
        if (this.userAgentRandomizer !== '') {
            return {
                "referer": `${this.baseUrl}/`,
                "user-agent": this.userAgentRandomizer,
                "accept": "image/avif,image/apng,image/jpeg;q=0.9,image/png;q=0.9,image/*;q=0.8"
            };
        }
        else {
            return {
                "referer": `${this.baseUrl}/`,
                "accept": "image/avif,image/apng,image/jpeg;q=0.9,image/png;q=0.9,image/*;q=0.8"
            };
        }
    }
    /**
     * It's hard to capture a default logic for homepages. So for Madara sources,
     * instead we've provided a homesection reader for the base_url/source_traversal_path/ endpoint.
     * This supports having paged views in almost all cases.
     * @param sectionCallback
     */
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
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
            ];
            const promises = [];
            for (const section of sections) {
                // Let the app load empty sections
                sectionCallback(section.section);
                // Get the section data
                promises.push(this.requestManager.schedule(section.request, 1).then(response => {
                    //this.CloudFlareError(response.status)
                    const $ = this.cheerio.load(response.data);
                    section.section.items = this.parser.parseHomeSection($, this);
                    sectionCallback(section.section);
                }));
            }
            // Make sure the function completes
            yield Promise.all(promises);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // We only have one homepage section ID, so we don't need to worry about handling that any
            const page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1; // Default to page 1
            let sortBy = '';
            switch (homepageSectionId) {
                case '0': {
                    sortBy = `latest`;
                    break;
                }
                case '1': {
                    sortBy = `${this.sourceTraversalPathName}`;
                    break;
                }
            }
            const request = createRequestObject({
                url: `${this.baseUrl}/${sortBy}?page=${page}`,
                method: 'GET',
                headers: this.constructHeaders()
            });
            const data = yield this.requestManager.schedule(request, 1);
            //this.CloudFlareError(data.status)
            const $ = this.cheerio.load(data.data);
            let collectedIds = [];
            let items = this.parser.parseHomeSection($, this, collectedIds);
            // Set up to go to the next page. If we are on the last page, remove the logic.
            let mData = { page: (page + 1) };
            if (this.parser.isLastPage($)) {
                mData = undefined;
            }
            return createPagedResults({
                results: items,
                metadata: mData
            });
        });
    }
    /**
     * Constructs requests to be sent to the search page.
     */
    constructSearchRequest(query) {
        return createRequestObject({
            url: encodeURI(`${this.baseUrl}/${this.sourceTraversalPathName}?query=${query.title}`),
            method: 'GET',
            headers: this.constructHeaders(),
        });
    }
    /*
     * Parses a time string from a Genkan source into a Date object.
     */
    convertTime(timeAgo) {
        var _a;
        let time;
        let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
        trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
        if (timeAgo.includes('mins') || timeAgo.includes('minutes') || timeAgo.includes('minute')) {
            time = new Date(Date.now() - trimmed * 60000);
        }
        else if (timeAgo.includes('hours') || timeAgo.includes('hour')) {
            time = new Date(Date.now() - trimmed * 3600000);
        }
        else if (timeAgo.includes('days') || timeAgo.includes('day')) {
            time = new Date(Date.now() - trimmed * 86400000);
        }
        else if (timeAgo.includes('weeks') || timeAgo.includes('week')) {
            time = new Date(Date.now() - trimmed * 604800000);
        }
        else if (timeAgo.includes('months') || timeAgo.includes('month')) {
            time = new Date(Date.now() - trimmed * 2548800000);
        }
        else if (timeAgo.includes('year') || timeAgo.includes('years')) {
            time = new Date(Date.now() - trimmed * 31556952000);
        }
        else {
            time = new Date(timeAgo);
        }
        return time;
    }
    constructHeaders(headers, refererPath) {
        headers = headers !== null && headers !== void 0 ? headers : {};
        if (this.userAgentRandomizer !== '') {
            headers['user-agent'] = this.userAgentRandomizer;
        }
        headers['referer'] = `${this.baseUrl}${refererPath !== null && refererPath !== void 0 ? refererPath : ''}`;
        return headers;
    }
}
exports.Genkan = Genkan;

},{"./GenkanParser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
class Parser {
    parseMangaDetails($, mangaId, source) {
        const title = this.decodeHTMLEntity($("div#content h5").first().text().trim());
        const summary = this.decodeHTMLEntity(($('.col-lg-9').clone().children().remove().end().text()).trim());
        const image = encodeURI(this.getImageSrc($("div.media a").first(), source.baseUrl));
        const views = Number($('.text-white').first().text().trim().split(',').join(''));
        const lastUpdate = source.convertTime($('div.item-date').text().trim());
        let hentai = false;
        // If we do not have a valid image, something is wrong with the generic parsing logic. A source should always remedy this with
        // a custom implementation.
        if (!image) {
            throw new Error(`Could not parse out a valid image while parsing manga details for manga: ${mangaId}`);
        }
        return createManga({
            id: mangaId,
            titles: [title],
            author: '',
            image: image,
            desc: summary,
            status: paperback_extensions_common_1.MangaStatus.ONGOING,
            rating: 0,
            views: views,
            hentai: hentai,
            lastUpdate: lastUpdate
        });
    }
    parseChapterList($, mangaId, source) {
        var _a, _b;
        const chapters = [];
        let sortingIndex = 0;
        // For each available chapter..
        for (const obj of $('div.col-sm-3').toArray()) {
            const id = ((_a = $('a.item-author', $(obj)).attr('href')) !== null && _a !== void 0 ? _a : '').replace(`${source.baseUrl}/${source.sourceTraversalPathName}/${mangaId}/`, '').replace(/\/$/, '');
            let volume = Number(id.split('/')[0]);
            let chapNum = Number(id.split('/').pop());
            let chapName = $('a.item-author', $(obj)).first().text().trim();
            let releaseDate = source.convertTime($('a.item-company', $(obj)).first().text());
            if (typeof id === 'undefined') {
                throw new Error(`Could not parse out ID when getting chapters for ${mangaId}`);
            }
            chapters.push(createChapter({
                id: id,
                mangaId: mangaId,
                langCode: (_b = source.languageCode) !== null && _b !== void 0 ? _b : paperback_extensions_common_1.LanguageCode.UNKNOWN,
                volume: Number.isNaN(volume) ? 0 : volume,
                chapNum: Number.isNaN(chapNum) ? 0 : chapNum,
                name: chapName ? chapName : undefined,
                time: releaseDate,
                // @ts-ignore
                sortingIndex
            }));
            sortingIndex--;
        }
        return chapters;
    }
    parseChapterDetails($, mangaId, chapterId, source) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let scriptObj = $('div#pages-container + script').toArray();
        if (typeof ((_b = (_a = scriptObj[0]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.data) === 'undefined') {
            throw (`Could not parse script for ${mangaId}`);
        }
        let allPages = ((_d = (_c = scriptObj[0]) === null || _c === void 0 ? void 0 : _c.children[0]) === null || _d === void 0 ? void 0 : _d.data.slice(((_f = (_e = scriptObj[0]) === null || _e === void 0 ? void 0 : _e.children[0]) === null || _f === void 0 ? void 0 : _f.data.indexOf('[')) + 1, (_h = (_g = scriptObj[0]) === null || _g === void 0 ? void 0 : _g.children[0]) === null || _h === void 0 ? void 0 : _h.data.lastIndexOf('];'))).replace(/["\\]/g, '').split(',');
        let pages = [];
        for (let obj of allPages) {
            let page = encodeURI(obj);
            page = page.startsWith('http') ? page : source.baseUrl + page;
            if (!page) {
                throw (`Could not parse page for ${mangaId}/${chapterId}`);
            }
            pages.push(page);
        }
        return createChapterDetails({
            id: chapterId,
            mangaId: mangaId,
            pages: pages !== null && pages !== void 0 ? pages : [''],
            longStrip: false
        });
    }
    parseSearchResults($, source) {
        var _a;
        const results = [];
        for (const obj of $('div.col-lg-9 div.flex').toArray()) {
            const id = ((_a = $('a', $(obj)).attr('href')) !== null && _a !== void 0 ? _a : '').replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').replace(/\/$/, '');
            const title = createIconText({ text: this.decodeHTMLEntity($("div#content h5").first().text().trim()) });
            const image = encodeURI(this.getImageSrc($("div.media a").first(), source.baseUrl));
            if (!id || !image || !title.text) {
                if (id.includes(source.baseUrl.replace(/\/$/, '')))
                    continue;
                // Something went wrong with our parsing, return a detailed error
                throw new Error(`Failed to parse searchResult for ${source.baseUrl} using ${source.searchMangaSelector} as a loop selector`);
            }
            results.push(createMangaTile({
                id: id,
                title: title,
                image: image,
            }));
        }
        return results;
    }
    parseSearchSection($, source, collectedIds) {
        return this.parseHomeSection($, source, collectedIds);
    }
    parseHomeSection($, source, collectedIds) {
        var _a, _b;
        const items = [];
        if (typeof collectedIds === 'undefined') {
            collectedIds = [];
        }
        for (const obj of $('div.list-item.rounded').toArray()) {
            const image = encodeURI((_a = this.getImageSrc($('a.media-content', $(obj)), source.baseUrl)) !== null && _a !== void 0 ? _a : '');
            const title = this.decodeHTMLEntity($('a.list-title', $(obj)).first().text().trim());
            const id = (_b = $('a.list-title', $(obj)).attr('href')) === null || _b === void 0 ? void 0 : _b.replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').split('/')[0];
            if (!id || !title || !image) {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/`);
            }
            if (!collectedIds.includes(id)) {
                items.push(createMangaTile({
                    id: id,
                    title: createIconText({ text: title }),
                    image: image
                }));
                collectedIds.push(id);
            }
        }
        return items;
    }
    filterUpdatedManga($, time, ids, source) {
        var _a, _b, _c;
        let passedReferenceTime = false;
        const updatedManga = [];
        for (const obj of $('div.list-item').toArray()) {
            const id = (_b = (_a = $('a.list-title', $(obj)).attr('href')) === null || _a === void 0 ? void 0 : _a.replace(`${source.baseUrl}/${source.sourceTraversalPathName}/`, '').split('/')[0]) !== null && _b !== void 0 ? _b : '';
            let mangaTime = source.convertTime((_c = $('.text-muted.text-sm', obj).text()) !== null && _c !== void 0 ? _c : '');
            passedReferenceTime = mangaTime <= time;
            if (!passedReferenceTime) {
                if (ids.includes(id)) {
                    updatedManga.push(id);
                }
            }
            else
                break;
            if (typeof id === 'undefined') {
                throw new Error(`Failed to parse homepage sections for ${source.baseUrl}/`);
            }
        }
        if (!passedReferenceTime) {
            return { updates: updatedManga, loadNextPage: true };
        }
        else {
            return { updates: updatedManga, loadNextPage: false };
        }
    }
    // UTILITY METHODS
    getImageSrc(imageObj, baseUrl) {
        var _a, _b;
        let trimmedLink = (_b = (_a = imageObj === null || imageObj === void 0 ? void 0 : imageObj.attr('style')) === null || _a === void 0 ? void 0 : _a.split('(')[1]) === null || _b === void 0 ? void 0 : _b.split(')')[0];
        let image = baseUrl + trimmedLink;
        return encodeURI(decodeURI(this.decodeHTMLEntity(image !== null && image !== void 0 ? image : '')));
    }
    isLastPage($) {
        return $('[rel=next]').first().length < 1;
    }
    decodeHTMLEntity(str) {
        return str.replace(/&#(\d+);/g, (_match, dec) => {
            return String.fromCharCode(dec);
        });
    }
}
exports.Parser = Parser;

},{"paperback-extensions-common":5}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroScans = exports.ZeroScansInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Genkan_1 = require("../Genkan");
const ZEROSCANS_DOMAIN = 'https://zeroscans.com';
exports.ZeroScansInfo = {
    version: Genkan_1.getExportVersion('0.0.0'),
    name: 'ZeroScans',
    description: 'Extension that pulls manga from zeroscans.com',
    author: 'darkdemon',
    authorWebsite: 'http://github.com/daarkdemon',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: ZEROSCANS_DOMAIN,
    sourceTags: [
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ]
};
class ZeroScans extends Genkan_1.Genkan {
    constructor() {
        super(...arguments);
        this.baseUrl = ZEROSCANS_DOMAIN;
        this.languageCode = paperback_extensions_common_1.LanguageCode.ENGLISH;
    }
}
exports.ZeroScans = ZeroScans;

},{"../Genkan":48,"paperback-extensions-common":5}]},{},[50])(50)
});
