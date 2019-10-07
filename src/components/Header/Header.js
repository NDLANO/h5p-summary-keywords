import React, {Fragment, useState, useCallback, useContext, useRef, useEffect} from 'react';
import classnames from 'classnames';
import {KeywordsContext} from "context/KeywordsContext";

function Header() {

    const context = useContext(KeywordsContext);

    const {
        id,
        language = 'en',
        collectExportValues,
        params: {
            header,
            description,
            resources: resourcesList,
        },
        translations
    } = context;

    const resourceContainer = useRef();
    const [hasResources, setHasResources] = useState(false);
    const [resourceList, setResourceList] = useState(false);

    useEffect(() => {
        const filterResourceList = element => Object.keys(element).length !== 0 && element.constructor === Object;
        if( !hasResources && resourcesList.params.resourceList && resourcesList.params.resourceList.filter(filterResourceList).length > 0){
            const resourceList = new H5P.ResourceList(resourcesList.params, id, language);
            resourceList.attach(resourceContainer.current);
            setHasResources(true);
            setResourceList(resourceList);

            collectExportValues('resources', () => resourcesList.params.resourceList
                .filter(filterResourceList)
                .map(resource => Object.assign({}, {
                    title: "",
                    url: "",
                    introduction: "",
                }, resource)) || []);
        }
    });


    const showResourceList = useCallback(() => {
        resourceList.show();
    }, [resourceList]);

    return (
        <Fragment>
            <header
                className={"h5p-keyword-header"}
                role={"banner"}
            >
                {hasResources === true && (
                    <button
                        className={"h5p-order-priority-resources-btn"}
                        onClick={showResourceList}
                        aria-label={"resource-button"}
                    >
                            <span className={classnames(['fa-stack'])} aria-hidden={"true"}>
                                <span className={"fa fa-circle-thin fa-stack-2x"} aria-hidden={"true"}/>
                                <span className={"fa fa-info fa-stack-1x"} aria-hidden={"true"}/>
                            </span>
                        <span id={"resource-button"}>{translations.resources}</span>
                    </button>
                )}
                <h1>{header}</h1>
                <p className={classnames('h5p-order-priority-description')}>{description}</p>
            </header>
            <aside
                ref={resourceContainer}
                aria-labelledby={"resource-button"}
            />
        </Fragment>
    );
}
export default Header;
