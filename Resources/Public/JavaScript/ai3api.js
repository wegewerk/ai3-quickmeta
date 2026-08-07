import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
import Ai3ApiBase from "@wegewerk/ai3core/ai3api.js";

class Ai3Api extends Ai3ApiBase {
    fetchPageRow(pageId) {
        return new AjaxRequest(TYPO3.settings.ajaxUrls['ai3_articlemeta'])
            .withQueryArguments({'page_id': pageId})
            .get();
    }
    getArticlemetaSuggestion(pageId) {
        return new AjaxRequest(TYPO3.settings.ajaxUrls['ai3_articlemeta_suggestion'])
            .withQueryArguments({'page_id': pageId})
            .get();
    }

}

export {Ai3Api as default};
