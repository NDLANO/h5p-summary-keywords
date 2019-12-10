import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Keywords from "../Keywords/Keywords";
import {useKeywordsContext} from "context/KeywordsContext";

function KeywordsList() {

    const context = useKeywordsContext();
    const {
        behaviour: {
            numberOfKeywords = 10,
        },
        translate,
        collectExportValues,
        registerReset,
    } = context;

    const [keywordList, setKeywords] = useState([]);

    registerReset(() => setKeywords([]));
    collectExportValues('keywords', () => keywordList);

    useEffect(() => context.trigger('resize'), [keywordList]);

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
        <section className={"h5p-keywords-keywordslist"}>
            <h2>{translate('headerKeywords')}</h2>
            <div className={"h5p-keywords-keywordslist-container"}>
                {keywordList.length === 0 && (
                    <div className={"h5p-keywords-no-keywords"}>{translate('noKeywordsAdded')}</div>
                )}
                {keywordList.map((keyword, index) => (
                    <Keywords
                        key={"k" + index}
                        keyword={keyword}
                        onDelete={() => handleDelete(index)}
                        onChange={keywordText => handleChange(keywordText, index)}
                        keywordPlaceholder={translate('keywordPlaceholder')}
                        ariaDelete={translate('delete')}
                    />))}
            </div>
            <button
                className={"h5p-keywords-add-keyword"}
                aria-labelledby={"addKeywordLabel"}
                onClick={addKeyword}
                aria-disabled={keywordList.length >= numberOfKeywords}
                disabled={keywordList.length >= numberOfKeywords}
            >
                <div>
                    <span className={"fa fa-plus"} aria-hidden={true}/>
                    <span
                        id={"addKeywordLabel"}
                    >
                        {translate('addKeyword', null)}
                    </span>
                </div>
            </button>
            <div className={"h5p-keywords-keywords-left"}>{translate('keywordsLeft', {':num': numberOfKeywords - keywordList.length})}</div>
        </section>
    );
}

export default KeywordsList;