import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const KeywordsContext = React.createContext();

function KeywordsContextProvider({ children, value }) {
  return (
    <KeywordsContext.Provider value={value}>
      {children}
    </KeywordsContext.Provider>
  );
}

function useKeywordsContext() {
  const context = useContext(KeywordsContext);
  if ( context === undefined) {
    throw new Error('useKeywords must be used within a KeywordContextProvider');
  }
  return context;
}

KeywordsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
};

export {
  KeywordsContextProvider,
  useKeywordsContext,
};
