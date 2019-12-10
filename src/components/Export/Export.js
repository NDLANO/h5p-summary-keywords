import React, {Fragment, useState, useRef, useEffect} from 'react';
import {useKeywordsContext} from "context/KeywordsContext";

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

    useEffect(() => {
        if( exportObject ){
            attachExport();
        }
    }, [exportObject]);

    useEffect(() => {
        if( exportDocument ){
            H5P.$window.on('resize', () => exportDocument.trigger('resize'));
        }
    }, [exportDocument]);

    function attachExport() {
        context.triggerXAPIScored(0, 0, 'completed');

        const exportDocument = new H5P.ExportPage(
            exportObject.mainTitle,
            getExportPreview(),
            true,
            translate('submitText'),
            translate('submitConfirmedText'),
            translate('selectAll'),
            translate('export'),
            H5P.instances[0].getLibraryFilePath('exportTemplate.docx'),
            exportObject
        );
        exportDocument.getElement().prependTo(exportContainer.current);
        setExportDocument(exportDocument);
    }

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
            description,
            hasResources: resources.length > 0,
            resources: resources,
            keywordHeader: translate('headerKeywords'),
            keywordsList: keywords.join(", "),
            essayHeader: translate('essayHeader'),
            essay: essay,
        });
    }

    function getExportPreview() {
        const documentExportTemplate =
            '<section class="export-preview">' +
            '<div class="page-header" role="heading" tabindex="-1">' +
            '<h1 class="page-title">{{mainTitle}}</h1>' +
            '</div>' +
            '<div class="page-description">{{description}}</div>' +
            '<h2>{{keywordHeader}}</h2>' +
            '<div class="page-keywords">{{keywordsList}}</div>' +
            '<h2>{{essayHeader}}</h2>' +
            '<div class="page-essay">{{essay}}</div>' +
            '<h2>{{header}}</h2>' +
            '{{^resources}}<p>{{labelNoResources}}</p>{{/resources}}' +
            '{{#hasResources}}' +
            '<table>' +
            '<tr><th>{{headerTitle}}</th><th>{{headerIntro}}</th><th>{{headerUrl}}</th></tr>' +
            '{{#resources}}<tr><td>{{title}}</td><td>{{introduction}}</td><td>{{url}}</td></tr>{{/resources}}' +
            '</table>' +
            '{{/hasResources}}' +
            '</section>';

        return Mustache.render(documentExportTemplate, exportObject);
    }

    return (
        <Fragment>
            <button
                className={"h5p-keywords-button-export"}
                onClick={() => setExportObject(getExportObject())}
            >
                <span className={"h5p-ri hri-document"} aria-hidden={"true"}/>
                {translate('createDocument')}
            </button>
            <div className={"export-container"} ref={exportContainer}/>
        </Fragment>
    );
}

export default Export;
