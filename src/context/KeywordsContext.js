import React from 'react';

export const KeywordsContext = React.createContext({
    params: {},
    behaviour: {},
    id: null,
    language: 'en',
    translations: {},
    registerReset: () => {},
    reset: () => {},
    collectExportValues: () => {},
});
