import React, {useContext, Fragment, useState, useRef, useEffect} from 'react';
import { KeywordsContext } from "context/KeywordsContext";

function Export() {

    const context = useContext(KeywordsContext);

    const exportContainer = useRef();
    const [exportDocument, setExportDocument] = useState();
    const [exportObject, setExportObject] = useState();

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
        const {
            translations,
        } = context;

        context.triggerXAPIScored(0, 0, 'completed');

        const exportDocument = new H5P.ExportPage(
            exportObject.mainTitle,
            getExportPreview(),
            false,
            "",
            "",
            translations.selectAll,
            translations.export,
            "http://contentauthor.local/exportTemplate.docx", //H5P.instances[0].getLibraryFilePath('exportTemplate.docx'),
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
            translations,
            collectExportValues,
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
            keywordHeader: translations.headerKeywords,
            keywordsList: keywords.join(", "),
            essayHeader: translations.essayHeader,
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
                className={"h5p-keywords-button-export pull-right"}
                onClick={() => setExportObject(getExportObject())}
            >
                <span className={"fa fa-file-text-o"} aria-hidden={"true"}/>
                {context.translations.createDocument}
            </button>
            <div className={"export-container"} ref={exportContainer}/>
        </Fragment>
    );
}

export default Export;
