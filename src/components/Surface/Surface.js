import React, { useRef, useEffect } from 'react';
import { useKeywordsContext } from './../../context/KeywordsContext.js';
import KeywordsList from '../KeywordsList/KeywordsList.js';
import Essay from '../Essay/Essay.js';
import Footer from '../Footer/Footer.js';
import Media from '../Media/Media.js';
import parseHTML from 'html-react-parser';

function Surface() {

  const resourceContainer = useRef();
  const context = useKeywordsContext();
  const {
    id,
    language = 'en',
    params: {
      resources: resourcesList,
      header,
      description = '',
      media,
    },
    collectExportValues,
  } = context;

  useEffect(() => {
    const filterResourceList = (element) => Object.keys(element).length !== 0 && element.constructor === Object;
    if (resourcesList.params.resourceList && resourcesList.params.resourceList.filter(filterResourceList).length > 0) {
      const resourceList = new H5P.ResourceList(resourcesList.params, id, language);
      resourceList.attach(resourceContainer.current);

      collectExportValues('resources', () => resourcesList.params.resourceList
        .filter(filterResourceList)
        .map((resource) => Object.assign({}, {
          title: '',
          url: '',
          introduction: '',
        }, resource)) || []);
    }
  }, [resourcesList]);

  return (
    <article>
      <div
        className={'h5p-keywords-header'}
      >{header}</div>
      <div
        className={'h5p-keywords-surface-main'}
      >
        <div
          className={'h5p-keywords-surface-info'}
          ref={resourceContainer}
        >
          {description && (
            <div className={'h5p-keywords-description'}>{parseHTML(description)}</div>
          )}
        </div>
        <Media
          mediaParams={media}
          id={id}
          language={language}
          onLoaded={() => context.trigger('resize')}
        />
        <KeywordsList />
        <Essay />
      </div>
      <Footer/>
    </article>
  );
}

export default Surface;
