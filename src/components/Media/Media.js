import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Media({ mediaParams, id, onLoaded }) {

  const mediaContainer = useRef();

  useEffect(() => {
    if ( typeof mediaParams === 'object' && mediaParams.parmams && Object.keys(mediaParams).length) {
      try {
        const media = H5P.newRunnable(mediaParams, id, H5P.jQuery(mediaContainer.current));
        H5P.on(media, 'loaded', onLoaded);
      }
      catch (e) {
        console.warn(e);
      }
    }
  }, [mediaParams]);

  return (
    <>
      {typeof mediaParams === 'object' && (
        <div
          className={'h5p-keywords-media'}
          ref={mediaContainer}
        />
      )}
    </>
  );
}

Media.propTypes = {
  mediaParams: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoaded: PropTypes.func,
};

export default Media;
