import React, {useContext} from 'react';

const KeywordsContext = React.createContext();

function KeywordsContextProvider({children, value}) {
    return (
        <KeywordsContext.Provider value={value}>
            {children}
        </KeywordsContext.Provider>
    );
}

function useKeywordsContext() {
    const context = useContext(KeywordsContext);
    if( context === undefined){
        throw new Error('useCategoryTask must be used within a CategoryTaskProvider');
    }
    return context;
}

export {
    KeywordsContextProvider,
    useKeywordsContext,
}
