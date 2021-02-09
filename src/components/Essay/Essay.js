import React, {useRef} from 'react';
import {useKeywordsContext} from "context/KeywordsContext";
import ReactHtmlParser from "react-html-parser";

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
    <section className={"h5p-keywords-essay"}>
      <h2 id={"essayHeader"}>{essayHeader}</h2>
      {essayInstruction && (
        <div id={"essayInstruction"}>{ReactHtmlParser(essayInstruction)}</div>
      )}
      <textarea
        aria-labelledby={"essayHeader"}
        aria-describedby={essayInstruction ? "essayInstrucion" : ""}
        ref={essayRef}
        placeholder={translate('essayPlaceholder')}
      />
    </section>
  );
}

export default Essay;
