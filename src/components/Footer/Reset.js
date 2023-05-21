import React, {useMemo, useRef, useState} from 'react';
import {useKeywordsContext} from 'context/KeywordsContext';
import Popover from '../Popover/Popover';

function Reset() {

  const [showPopover, setPopover] = useState(false);
  const context = useKeywordsContext();
  const resetButtonRef = useRef(null);

  const {
    behaviour: {
      enableRetry = false
    },
    reset,
    translate
  } = context;

  function togglePopover(event) {
    // The first event target to open the popover will be the reset button
    if (!resetButtonRef.current) {
      resetButtonRef.current = event?.target;
    }

    setPopover(!showPopover);
  }

  function confirmReset() {
    reset();
    togglePopover();
  }

  const openerRect = useMemo(
    () => resetButtonRef.current?.getBoundingClientRect(),
    [resetButtonRef.current],
  );

  return (
    <>
      {enableRetry === true && (
        <Popover
          handleClose={togglePopover}
          show={showPopover}
          classnames={Array.from(context.activeBreakpoints)}
          close={translate('close')}
          header={translate('restart')}
          align={'start'}
          openerRect={openerRect}
          popoverContent={(
            <div
              role={'dialog'}
              aria-labelledby={'resetTitle'}
              className={'h5p-keywords-reset-modal'}
            >
              <div
                id={'resetTitle'}
              >
                {translate('ifYouContinueAllYourChangesWillBeLost')}
              </div>
              <div>
                <button
                  onClick={confirmReset}
                  className={'continue'}
                  type={'button'}
                >
                  {translate('continue')}
                </button>
                <button
                  onClick={togglePopover}
                  className={'cancel'}
                  type={'button'}
                >
                  {translate('cancel')}
                </button>
              </div>
            </div>
          )}
        >
          <button
            className={'h5p-keywords-button-restart'}
            onClick={togglePopover}
            type={'button'}
          >
            <span
              className={'h5p-ri hri-restart'}
            />
            {translate('restart')}
          </button>
        </Popover>
      )}
    </>
  );
}

export default Reset;
