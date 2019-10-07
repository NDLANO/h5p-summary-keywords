import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Keywords from "../Keywords/Keywords";
import classnames from 'classnames';

function KeywordsList(props) {

    const {
        addKeywordLabel,
        keywordHeader,
        numberOfKeywords,
        translate,
    } = props;

    const [keywordList, setKeywords] = useState([]);

    props.registerReset(() => setKeywords([]));

    props.export('keywords', () => keywordList);

    function addKeyword() {
        setKeywords([...keywordList, ""]);
    }

    function handleDelete(index) {
        keywordList.splice(index, 1);
        setKeywords([...keywordList]);
    }

    function handleChange(keywordText, index) {
        keywordList[index] = keywordText;
        setKeywords([...keywordList]);
    }

    return (
        <section>
            <h2>{keywordHeader}</h2>
            <div className={classnames("h5p-keywords-keywordslist-container", {
                'empty': keywordList.length === 0
            })}>
                {keywordList.map((keyword, index) => (
                    <Keywords
                        key={"k" + index}
                        keyword={keyword}
                        onDelete={() => handleDelete(index)}
                        onChange={keywordText => handleChange(keywordText, index)}
                        keywordPlaceholder={translate('keywordPlaceholder')}
                    />))}
            </div>
            <button
                aria-labelledby={"addKeywordLabel"}
                onClick={addKeyword}
                aria-disabled={keywordList.length >= numberOfKeywords}
                disabled={keywordList.length >= numberOfKeywords}
            >
                <span className={"fa fa-plus"} aria-hidden={true}/>
                <span
                    id={"addKeywordLabel"}
                >
                    {addKeywordLabel}
                </span>
            </button>
            <span>{translate('keywordsLeft', {num: numberOfKeywords - keywordList.length})}</span>
        </section>
    );
}

KeywordsList.propTypes = {
    numberOfKeywords: PropTypes.number,
    keywordHeader: PropTypes.string,
    addKeywordLabel: PropTypes.string,
    translate: PropTypes.func,
    keywordList: PropTypes.array,
    registerReset: PropTypes.func,
    export: PropTypes.func,
};

export default KeywordsList;