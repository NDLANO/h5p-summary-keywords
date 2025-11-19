import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useKeywordsContext } from './../../context/KeywordsContext.js';
import { escapeHTML, stripHTML } from './../../components/utils.js';

function Export() {

  const context = useKeywordsContext();

  const exportContainer = useRef();
  const [exportDocument, setExportDocument] = useState();
  const [exportObject, setExportObject] = useState();

  const {
    translations,
    translate,
    collectExportValues,
  } = context;

  function getExportPreview() {
    const documentExportTemplate =
      '<section class="export-preview">' +
            '<div class="page-header" role="heading" tabindex="-1">' +
            '<div class="page-title h1">{{mainTitle}}</div>' +
            '</div>' +
            '<div class="page-description">{{description}}</div>' +
            '{{#hasKeywords}}' +
            '<div class="h2">{{keywordHeader}}</div>' +
            '<div class="page-keywords">{{keywordsList}}</div>' +
            '{{/hasKeywords}}' +
            '{{#hasEssay}}' +
            '<div class="h2">{{essayHeader}}</div>' +
            '<div class="page-essay">{{essay}}</div>' +
            '{{/hasEssay}}' +
            '{{#hasResources}}' +
            '<div class="h2">{{header}}</div>' +
            '<table>' +
            '<tr><th>{{headerTitle}}</th><th>{{headerIntro}}</th><th>{{headerUrl}}</th></tr>' +
            '{{#resources}}<tr><td>{{title}}</td><td>{{introduction}}</td><td>{{url}}</td></tr>{{/resources}}' +
            '</table>' +
            '{{/hasResources}}' +
            '</section>';

    return Mustache.render(documentExportTemplate, exportObject);
  }

  function attachExport() {
    context.triggerXAPIScored(0, 0, 'completed');

    const useExport = H5PIntegration.reportingIsEnabled || false;
    const exportDocument = new H5P.ExportPage(
      escapeHTML(exportObject.mainTitle),
      getExportPreview(),
      useExport,
      escapeHTML(translate('submitText')),
      escapeHTML(translate('submitConfirmedText')),
      escapeHTML(translate('selectAll')),
      escapeHTML(translate('export')),
      H5P.instances[0].getLibraryFilePath('exportTemplate.docx'),
      exportObject
    );
    exportDocument.getElement().prependTo(exportContainer.current);
    setExportDocument(exportDocument);
  }

  useEffect(() => {
    if ( exportObject ) {
      attachExport();
    }
  }, [exportObject]);

  useEffect(() => {
    if ( exportDocument ) {
      H5P.$window.on('resize', () => exportDocument.trigger('resize'));
    }
  }, [exportDocument]);

  function getExportObject() {
    const {
      params: {
        header,
        description = '',
      },
    } = context;

    const {
      resources = [],
      keywords = [],
      essay = '',
    } = collectExportValues();

    return Object.assign({}, translations, {
      mainTitle: header,
      description: stripHTML(description),
      hasResources: resources.length > 0,
      resources: resources,
      keywordHeader: translate('headerKeywords'),
      hasKeywords: keywords.length > 0,
      keywordsList: keywords.join(', '),
      essayHeader: translate('essayHeader'),
      essay: essay,
      hasEssay: essay && essay.length !== 0,
    });
  }

  return (
    <Fragment>
      <button
        className={'h5p-keywords-button-export'}
        type={'button'}
        onClick={() => setExportObject(getExportObject())}
      >
        <span className={'h5p-ri hri-document'} />
        {translate('createDocument')}
      </button>
      <div className={'export-container'} ref={exportContainer}/>
    </Fragment>
  );
}

export default Export;
