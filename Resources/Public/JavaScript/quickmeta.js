import {lll} from "@typo3/core/lit-helper.js";
import {html, render} from 'lit-html';
import Ai3Api from './ai3api.js'
import Notification from "@typo3/backend/notification.js";

class QuickmetaApp {
    constructor(container) {
        this.container = container;
        this.pageId = container.dataset.pageId;
        this.api = new Ai3Api();
        this.loading = false;
        this.saving = false;
        this.pageData = {};
        this.suggestion = {};
        this.suggestionsready = false;
        this.autoFields = [
            {
                id: 'ai3_title',
                name: 'title',
                label: lll('tx_ai3.quickmeta.pagetitle'),
                type: 'text'
            },
            {
                id: 'ai3_nav_title',
                name: 'nav_title',
                label: lll('tx_ai3.quickmeta.nav_title'),
                type: 'text'
            },
            {
                id: 'ai3_seo_title',
                name: 'seo_title',
                label: lll('tx_ai3.quickmeta.seo_title'),
                type: 'text'
            },
            {
                id: 'ai3_abstract',
                name: 'abstract',
                label: lll('tx_ai3.quickmeta.abstract'),
                type: 'textarea',
                rows: 4
            },
            {
                id: 'ai3_description',
                name: 'description',
                label: lll('tx_ai3.quickmeta.description'),
                type: 'textarea',
                rows: 4
            },
            {
                id: 'og_title',
                name: 'og_title',
                label: lll('tx_ai3.quickmeta.og_title'),
                type: 'text',
            },

            {
                id: 'og_description',
                name: 'og_description',
                label: lll('tx_ai3.quickmeta.og_description'),
                type: 'textarea',
                rows: 4
            },

            {
                id: 'twitter_title',
                name: 'twitter_title',
                label: lll('tx_ai3.quickmeta.twitter_title'),
                type: 'text',
            },

            {
                id: 'twitter_description',
                name: 'twitter_description',
                label: lll('tx_ai3.quickmeta.twitter_description'),
                type: 'textarea',
                rows: 4
            },
        ];
    }

    init() {
        this.getPageData();
        this.render();
    }

    async getPageData() {
        this.loading = true;

        try {
            const response = await this.api.fetchPageRow(this.pageId);
            const result = await response.resolve();
            const data = JSON.parse(result);

            if (data.success && data.pageData) {
                this.pageData = data.pageData;
                this.hasContent = data.hasContent;
            } else {
                Notification.error(lll('tx_ai3.quickmeta.error'), data.error || 'Unknown error');
            }
        } catch (error) {
            let message = await error.response.json();
            Notification.error(lll('tx_ai3.quickmeta.error'), message.error);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    async getSuggestion() {
        this.loading = true;
        this.render();

        try {
            const response = await this.api.getArticlemetaSuggestion(this.pageId);
            const result = await response.resolve();
            const data = JSON.parse(result);

            if (data.success && data.suggestion) {
                this.suggestion = {};
                this.autoFields.map(field => {
                    this.suggestion[field.name] = data.suggestion[field.name];
                })
                this.suggestionsready = true;
            } else {
                Notification.error(lll('tx_ai3.quickmeta.error'), data.error || 'Unknown error');
            }
        } catch (error) {
            let message = await error.response.json();
            Notification.error(lll('tx_ai3.quickmeta.error'), message.error);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    // Helper to set a field value and dispatch the change event.
    setField = (fieldName, value) => {
        const field = this.getFormengineField(fieldName);
        if (!field) {
            return false;
        }
        field.value = value;
        // Trigger change event for TYPO3 to recognize the change
        field.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    };

    getFormengineField(fieldName) {
        const selector = `[data-formengine-input-name="data[pages][${this.pageId}][${fieldName}]"]`;
        return document.querySelector(selector);
    }

    transferSuggestionsToPagefields() {
        this.autoFields.map(field => {
            this.setField(field.name,this.suggestion[field.name]);
            this.pageData[field.name] = this.suggestion[field.name];
        })
        this.render();
    }
    transferSuggestionsToEmptyPagefields() {
        this.autoFields.map(field => {
            if(this.pageData[field.name] == '') {
                this.setField(field.name, this.suggestion[field.name]);
                this.pageData[field.name] = this.suggestion[field.name];
            }
        })
        this.render();
    }
    transferSuggestion(fieldname) {
        this.setField(fieldname,this.suggestion[fieldname]);
        this.pageData[fieldname] = this.suggestion[fieldname];
        this.render();
    }
    // Generic helper to add or remove classes to a single field
    // `add` determines whether to add (true) or remove (false) the classes.
    // `filterFn` can be used to restrict the operation to a subset of elements.
    _toggleHighlight(field,add, filterFn = () => true) {
        const highlightClasses = ['border-info','text-bg-notice'];
            const el = document.getElementById(field.id);
            if (!el) return;
            if (!filterFn(el)) return;
            highlightClasses.forEach(highlightClass => {
                if (add) {
                    el.classList.add(highlightClass);
                } else {
                    el.classList.remove(highlightClass);
                }
            })
        this.render();
    }

    highlightField(field) {
        this._toggleHighlight(field, true);
    }
    // Highlight all fields.
    highlightAllPagefields() {
        this.autoFields.forEach(field => {
            this._toggleHighlight(field,true);
        });
    }

    // Highlight only empty fields.
    highlightEmptyPagefields() {
        this.autoFields.forEach(field => {
            this._toggleHighlight(field,true, el => !el.value);
        });
    }

    // Remove highlight from all fields.
    removeHighlightAllPagefields() {
        this.autoFields.forEach(field => {
            this._toggleHighlight(field,false);
        });
    }

    updateSuggestion(field,e) {
        console.log(this.suggestion[field.name]);
        this.suggestion[field.name] = e.target.value;
        console.log(this.suggestion[field.name]);
        this.render();
    }


    render() {
        const template = html`
            ${!this.hasContent ? lll('tx_ai3.quickmeta.error.nocontent')
                    : html`
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col">
                            <h5>${lll('tx_ai3.quickmeta.title.pagedata')}</h5>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <h5>${lll('tx_ai3.quickmeta.title.suggestion')}
                        ${this.loading ? html`<typo3-backend-spinner size="small"></typo3-backend-spinner>` : ''}
                    </h5>
                    <button
                            type="button"
                            class="btn btn-default"
                            @click="${() => this.getSuggestion()}"
                            ?disabled="${this.loading}"
                    >
                        <typo3-backend-icon identifier="ai3-quickmeta-icon" size="small"></typo3-backend-icon>
                        ${this.loading ? lll('tx_ai3.quickmeta.generating') : lll('tx_ai3.quickmeta.button')}
                    </button>
                    ${this.suggestionsready ? html`
                                <button
                                        type="button"
                                        class="btn btn-default"
                                        @click="${() => this.transferSuggestionsToPagefields()}"
                                        @mouseover="${() => this.highlightAllPagefields()}"
                                        @mouseout="${() => this.removeHighlightAllPagefields()}"
                                        ?disabled="${this.loading}"
                                >${lll('tx_ai3.quickmeta.transfer_all')}</button>
                                </button>
                                <button
                                        type="button"
                                        class="btn btn-default"
                                        @click="${() => this.transferSuggestionsToEmptyPagefields()}"
                                        @mouseover="${() => this.highlightEmptyPagefields()}"
                                        @mouseout="${() => this.removeHighlightAllPagefields()}"
                                        ?disabled="${this.loading}"
                                >${lll('tx_ai3.quickmeta.transfer_empty')}</button>
                                </button>
                            `:''}
                </div>
            </div>

            ${this.autoFields.map(field => html`
                <div class="row mb-3">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col">
                                <label for="${field.id}" class="form-label">${field.label}</label>
                                ${field.type === 'textarea'
                                        ? html`<textarea id="${field.id}" name="${field.id}" rows="${field.rows || 3}"
                                                         class="form-control"
                                                         disabled="disabled"
                                               >${this.pageData[field.name] || ''}</textarea>`
                                        : html`<input type="text" id="${field.id}" name="${field.id}"
                                                      class="form-control"
                                                      disabled="disabled"
                                                      value="${this.pageData[field.name] || ''}">`
                                }
                            </div>
                            <div class="col-auto align-content-end">
                                <button
                                        type="button"
                                        class="btn btn-default"
                                        @click="${() => this.transferSuggestion(field.name)}"
                                        @mouseover="${() => this.highlightField(field)}"
                                        @mouseout="${() => this.removeHighlightAllPagefields()}"
                                        ?disabled="${ this.loading || ( !this.suggestion[field.name] )}"
                                >
                                    <typo3-backend-icon identifier="actions-arrow-left" size="small"></typo3-backend-icon>

                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="${field.id}_suggest" class="form-label">${field.label}</label>
                        ${field.type === 'textarea'
                                ? html`<textarea id="${field.id}_suggest" name="${field.name}_suggest" rows="${field.rows || 3}"
                                                 @change="${(e) => this.updateSuggestion(field,e)}"
                                                 ?disabled="${ this.loading || ( !this.suggestionsready)}"
                                                 class="form-control"
                                       >${this.suggestion[field.name] || ''}</textarea>`
                                : html`<input type="text" id="${field.id}_suggest" name="${field.name}_suggest"
                                              class="form-control"
                                              ?disabled="${ this.loading || ( !this.suggestionsready)}"
                                              @change="${(e) => this.updateSuggestion(field,e)}"
                                              value="${this.suggestion[field.name] || ''}">`
                        }
                    </div>
                </div>
            `)}
        `}`;
        render(template, this.container.querySelector('[data-ai3="ai3-quickmeta-app"]'));
    }
}

document.querySelectorAll('[data-ai3="ai3-quickmeta-container"]').forEach(container => {
    const app = new QuickmetaApp(container);
    app.init();
});
