import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import markerIcon from '../../../assets/marker.svg';
import {debounce} from '../utils';
import classnames from 'classnames';

function Keywords({keyword, onChange, keywordPlaceholder, addKeyword, ariaDelete, onDelete}) {

  const [inEditMode, toggleEditMode] = useState(true);
  const [isUpdate, setUpdate] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (inEditMode) {
      inputRef.current.focus();
      setUpdate(keyword.length > 0);
    }
  }, [inEditMode]);

  function handleBlur(event) {
    if (event.which !== undefined && inEditMode) {
      if (inputRef.current.value.length > 0 && !isUpdate) {
        addKeyword();
      }
      else if (inputRef.current.value.length === 0) {
        onDelete();
      }
    }
    toggleEditMode(false);
  }

  function handleKeyPress(event) {
    if (event.which === 13) {
      if (inEditMode) {
        handleBlur(event);
      }
      else {
        toggleEditMode(true);
      }
    }
    if (event.which === 32 && !inEditMode) {
      toggleEditMode(true);
    }
  }

  return (
    <div
      className={'h5p-keywords-keyword-container'}
    >
      <div className={'h5p-keywords-keyword-container-inner'}>
        <label
          className={classnames('h5p-keywords-keyword', {
            'hidden': !inEditMode
          })}
        >
          <input
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            onChange={debounce(() => onChange(inputRef.current.value), 100)}
            placeholder={keywordPlaceholder}
            style={{
              backgroundImage: 'url(' + markerIcon + ')',
            }}
          />
        </label>
        <div
          className={classnames('h5p-keywords-keyword', {
            'hidden': inEditMode,
          })}
          onClick={() => toggleEditMode(true)}
          onKeyPress={handleKeyPress}
          role={'button'}
          tabIndex={0}
        >
          {keyword.length > 0 ? keyword : keywordPlaceholder}
        </div>
        <button
          onClick={onDelete}
          type={'button'}
          className={'h5p-keywords-keyword-button'}
        >
          <span
            className={'h5p-ri hri-times'}
          />
          <span
            className={'visible-hidden'}
          >{ariaDelete}</span>
        </button>
      </div>
    </div>
  );
}

Keywords.propTypes = {
  keyword: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  keywordPlaceholder: PropTypes.string,
  ariaDelete: PropTypes.string,
  addKeyword: PropTypes.func,
};

export default Keywords;
