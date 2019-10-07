import React, { useContext } from 'react';
import Header from "../Header/Header";
import { KeywordsContext } from 'context/KeywordsContext';
import KeywordsList from "../KeywordsList/KeywordsList";
import Essay from "../Essay/Essay";
import Footer from "../Footer/Footer";

function Surface() {

    const context = useContext(KeywordsContext);
    const {
        params: {
            numberOfKeywords = 10
        },
        translate,
        collectExportValues,
    } = context;

    return (
        <main>
            <Header/>
            <KeywordsList
                numberOfKeywords={numberOfKeywords}
                keywordHeader={translate('headerKeywords')}
                addKeywordLabel={translate('addKeyword', null)}
                translate={translate}
                registerReset={context.registerReset}
                export={collectExportValues}
            />
            <Essay
                header={translate('essayHeader')}
                registerReset={context.registerReset}
                export={collectExportValues}
            />
            <Footer/>
        </main>
    );
}

export default Surface;