import "core-js";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from "react-dom";
import { KeywordsContext } from 'context/KeywordsContext';
import Surface from "components/Surface/Surface";
import 'components/Keywords.scss';

// Load library
H5P = H5P || {};
H5P.Keywords = (function () {

    const breakPoints = [
        {
            "className": "h5p-medium-tablet-size",
            "shouldAdd": width => width >= 500 && width < 768
        },
        {
            "className": "h5p-large-tablet-size",
            "shouldAdd": width => width >= 768 && width < 1024
        },
        {
            "className": "h5p-large-size",
            "shouldAdd": width => width >= 1024
        },
    ];

    function Wrapper(params, contentId, extras = {}) {
        // Initialize event inheritance
        H5P.EventDispatcher.call(this);

        const {
            language = 'en'
        } = extras;

        this.container;
        this.params = params;
        this.behaviour = params.behaviour || {};
        this.resetStack = [];
        this.collectExportValuesStack = [];
        this.wrapper = null;
        this.id = contentId;
        this.language = language;
        this.activityStartTime = new Date();

        this.translations = Object.assign({}, {
            resources: "Resources",
            save: "Save",
            restart: "Restart",
            createDocument: "Create document",
            labelSummaryComment: "Summary comment",
            labelStatement: "Statement",
            labelResources: "Resources",
            selectAll: "Select all",
            export: "Export",
            add: "Add new keyword",
            yes: "Yes",
            no: "No",
            ifYouContinueAllYourChangesWillBeLost: "If you continue all your changes will be lost.",
            areYouSure: "Are you sure?",
            keywordsLeft: ":num keywords left",
            essayHeader: "Essay",
            keywordPlaceholder: "Type a keyword...",
        }, params.l10n, params.resourceReport, params.accessibility);

        const createElements = () => {
            const wrapper = document.createElement('div');
            wrapper.id = 'h5p-keywords-wrapper';
            wrapper.classList.add('h5p-keywords-wrapper');
            this.wrapper = wrapper;

            ReactDOM.render(
                <KeywordsContext.Provider value={this}>
                    <Surface/>
                </KeywordsContext.Provider>,
                this.wrapper
            );
        };

        this.collectExportValues = (index, callback) => {
            if (typeof index !== "undefined") {
                this.collectExportValuesStack.push({key: index, callback: callback});
            } else {
                const exportValues = {};
                this.collectExportValuesStack.forEach(({key, callback}) => exportValues[key] = callback());
                return exportValues;
            }
        };

        this.registerReset = callback => this.resetStack.push(callback);

        this.attach = $container => {
            if (!this.wrapper) {
                createElements();
            }

            // Append elements to DOM
            $container[0].appendChild(this.wrapper);
            $container[0].classList.add('h5p-keywords');
            this.container = $container;
        };

        this.getRect = () => {
            return this.wrapper.getBoundingClientRect();
        };

        this.reset = () => {
            this.resetStack.forEach(callback => callback());
        };

        this.resize = () => {
            if (!this.wrapper) {
                return;
            }
            const rect = this.getRect();
            breakPoints.forEach(item => {
                if (item.shouldAdd(rect.width)) {
                    this.wrapper.classList.add(item.className);
                } else {
                    this.wrapper.classList.remove(item.className);
                }
            });
        };

        /**
         * Help fetch the correct translations.
         *
         * @params key
         * @params vars
         * @return {string}
         */
        this.translate = (key, vars) => {
            let translation = this.translations[key];
            if (vars !== undefined && vars !== null) {
                translation = Object
                    .keys(vars)
                    .map(key => translation.replace(key, vars[key]))
                    .toString();
            }
            return translation;
        };

        this.getRect = this.getRect.bind(this);
        this.resize = this.resize.bind(this);
        this.on('resize', this.resize);
    }

    // Inherit prototype properties
    Wrapper.prototype = Object.create(H5P.EventDispatcher.prototype);
    Wrapper.prototype.constructor = Wrapper;

    return Wrapper;
})();
