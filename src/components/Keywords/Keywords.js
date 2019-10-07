import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function Keywords(props) {

    const [inEditmode, toggleEditmode] = useState(true);

    const inputRef = useRef(props.keyword);

    useEffect(() => {
        if( inEditmode && inputRef.current ){
            inputRef.current.focus();
        }
    });

    function handleKeyPress(event){
        if (event.which === 13) {
            toggleEditmode(!inEditmode);
        }
    }

    let visibleElement;
    if (inEditmode) {
        visibleElement = (
            <label>
                <input
                    ref={inputRef}
                    className={"h5p-keywords-keyword active"}
                    onKeyPress={handleKeyPress}
                    onBlur={() => toggleEditmode(false)}
                    value={props.keyword}
                    onChange={() => props.onChange(inputRef.current.value)}
                    placeholder={props.keywordPlaceholder}
                />
            </label>
        );
    } else {
        visibleElement = (
            <span
                className={"h5p-keywords-keyword"}
                onClick={() => toggleEditmode(true)}
                onKeyPress={handleKeyPress}
                tabIndex={0}
            >{props.keyword.length > 0 ? props.keyword : props.keywordPlaceholder}</span>
        )
    }

    return (
        <div
            className={"h5p-keywords-keyword-container"}
        >
            {visibleElement}
            <button
                onClick={props.onDelete}
            >
                <span
                    className={'fa fa-trash'}
                    aria-hidden={true}
                />
                <span
                    className={"visible-hidden"}
                >Delete</span>
            </button>
        </div>
    );
}

Keywords.propTypes = {
    keyword: PropTypes.string,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
    keywordPlaceholder: PropTypes.string,
};

export default Keywords;