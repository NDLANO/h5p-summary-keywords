import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import markerIcon from "@assets/marker.svg";
import {debounce} from "../utils";
import classnames from 'classnames';

function Keywords(props) {

    const [inEditmode, toggleEditmode] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        if( inEditmode ){
            inputRef.current.focus();
        }
    }, [inEditmode]);

    function handleKeyPress(event){
        if (event.which === 13) {
            toggleEditmode(!inEditmode);
        }
    }

    return (
        <div
            className={"h5p-keywords-keyword-container"}
        >
            <div className={"h5p-keywords-keyword-container-inner"}>
                <label
                    className={classnames("h5p-keywords-keyword",{
                        "hidden": !inEditmode
                    })}
                >
                    <input
                        ref={inputRef}
                        onKeyPress={handleKeyPress}
                        onBlur={() => toggleEditmode(false)}
                        onChange={debounce(() => props.onChange(inputRef.current.value), 200)}
                        placeholder={props.keywordPlaceholder}
                        style={{
                            backgroundImage: 'url(' + markerIcon + ')',
                        }}
                    />
                </label>
                <div
                    className={classnames("h5p-keywords-keyword", {
                        "hidden": inEditmode,
                    })}
                    onClick={() => toggleEditmode(true)}
                    onKeyPress={handleKeyPress}
                    tabIndex={0}
                >
                    {props.keyword.length > 0 ? props.keyword : props.keywordPlaceholder}
                </div>
                <button
                    onClick={props.onDelete}
                    className={"h5p-keywords-keyword-button"}
                >
                    <span
                        className={'h5p-ri hri-times'}
                        aria-hidden={true}
                    />
                    <span
                        className={"visible-hidden"}
                    >{props.ariaDelete}</span>
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
};

export default Keywords;