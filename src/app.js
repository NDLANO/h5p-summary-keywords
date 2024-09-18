import React from 'react';
import { createRoot } from 'react-dom/client';
import { KeywordsContextProvider } from 'context/KeywordsContext';
import Surface from 'components/Surface/Surface';
import 'components/Keywords.scss';
import 'fonts/H5PReflectionFont.scss';
import { breakpoints, getRatio, sanitizeParams } from 'components/utils';

// Load library
H5P.SummaryKeywords = (function () {

  function Wrapper(params, contentId, extras = {}) {
    // Initialize event inheritance
    H5P.EventDispatcher.call(this);

    const {
      language = 'en'
    } = extras;

    let container;
    this.params = sanitizeParams(params);
    this.behaviour = this.params.behaviour || {};
    this.resetStack = [];
    this.collectExportValuesStack = [];
    this.wrapper = null;
    this.id = contentId;
    this.language = language;
    this.activityStartTime = new Date();
    this.activeBreakpoints = [];
    this.currentRatio = null;

    this.translations = Object.assign({}, {
      resources: 'Resources',
      save: 'Save',
      restart: 'Restart',
      createDocument: 'Create document',
      labelResources: 'Resources',
      selectAll: 'Select all',
      export: 'Export',
      add: 'Add new keyword',
      delete: 'Delete',
      ifYouContinueAllYourChangesWillBeLost: 'If you continue all your changes will be lost.',
      close: 'Close',
      keywordsLeft: ':num keywords left',
      essayHeader: 'Essay',
      keywordPlaceholder: 'Type a keyword...',
      continue: 'Continue',
      cancel: 'Cancel',
      essayInstruction: 'Write down an essay using the keywords you picked',
      essayPlaceholder: 'Type your answer here',
    }, this.params.l10n, this.params.resourceReport, this.params.accessibility);

    const createElements = () => {
      const wrapper = document.createElement('div');
      wrapper.id = 'h5p-keywords-wrapper';
      wrapper.classList.add('h5p-keywords-wrapper');
      this.wrapper = wrapper;

      const root = createRoot(this.wrapper);
      root.render(
        <KeywordsContextProvider value={this}>
          <Surface />
        </KeywordsContextProvider>
      );
    };

    this.collectExportValues = (index, callback) => {
      if (typeof index !== 'undefined') {
        this.collectExportValuesStack.push({ key: index, callback: callback });
      }
      else {
        const exportValues = {};
        this.collectExportValuesStack.forEach(({ key, callback }) => exportValues[key] = callback());
        return exportValues;
      }
    };

    this.registerReset = (callback) => this.resetStack.push(callback);

    this.attach = ($container) => {
      if (!this.wrapper) {
        createElements();
      }

      // Append elements to DOM
      $container[0].appendChild(this.wrapper);
      $container[0].classList.add('h5p-keywords');
      container = $container[0];
    };

    this.getRect = () => {
      return this.wrapper.getBoundingClientRect();
    };

    this.reset = () => this.resetStack.forEach((callback) => callback());

    /**
     * Set css classes based on ratio available to the container
     *
     * @param wrapper
     * @param ratio
     */
    this.addBreakPoints = (wrapper, ratio = getRatio(container)) => {
      if (ratio === this.currentRatio) {
        return;
      }
      this.activeBreakpoints = [];
      breakpoints().forEach((item) => {
        if (item.shouldAdd(ratio)) {
          wrapper.classList.add(item.className);
          this.activeBreakpoints.push(item.className);
        }
        else {
          wrapper.classList.remove(item.className);
        }
      });
      this.currentRatio = ratio;
    };

    this.resize = () => {
      if (!this.wrapper) {
        return;
      }
      this.addBreakPoints(this.wrapper);
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
          .map((key) => translation.replace(key, vars[key]))
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
