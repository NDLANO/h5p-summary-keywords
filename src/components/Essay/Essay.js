import React, { useRef } from 'react';
import { useKeywordsContext } from 'context/KeywordsContext';
import parseHTML from 'html-react-parser';

function Essay() {

  const essayRef = useRef();
  const context = useKeywordsContext();

  const {
    translate,
    registerReset,
    collectExportValues,
    params: {
      essayHeader,
      essayInstruction,
    }
  } = context;

  registerReset(() => essayRef.current.value = '');
  collectExportValues('essay', () => essayRef.current.value);

  return (
    <section className={'h5p-keywords-essay'}>
      <div id={'essayHeader'}>{essayHeader}</div>
      {essayInstruction && (
        <div id={'essayInstruction'}>{parseHTML(essayInstruction)}</div>
      )}
      <textarea
        aria-labelledby={'essayHeader'}
        aria-describedby={essayInstruction ? 'essayInstrucion' : undefined}
        ref={essayRef}
        placeholder={translate('essayPlaceholder')}
      />
    </section>
  );
}

export default Essay;
