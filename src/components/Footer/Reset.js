import React, {Fragment, useState} from 'react';
import {useKeywordsContext} from "context/KeywordsContext";
import Popover from "../Popover/Popover";

function Reset() {

    const [showPopover, setPopover] = useState(false);
    const context = useKeywordsContext();

    function togglePopover(){
        setPopover(!showPopover);
    }

    function confirmReset() {
        reset();
        togglePopover();
    }

    const {
        behaviour: {
            enableRetry = false
        },
        reset,
        translate
    } = context;

    return (
        <Fragment>
            {enableRetry === true && (
                <Popover
                    handleClose={togglePopover}
                    show={showPopover}
                    classnames={Array.from(context.activeBreakpoints)}
                    close={translate('close')}
                    header={translate('restart')}
                    align={"start"}
                    popoverContent={(
                        <div
                            role={"dialog"}
                            aria-labelledby={"resetTitle"}
                            className={"h5p-keywords-reset-modal"}
                        >
                            <div
                                id={"resetTitle"}
                            >
                                {translate('ifYouContinueAllYourChangesWillBeLost')}
                            </div>
                            <div>
                                <button
                                    onClick={confirmReset}
                                    className={"continue"}
                                >
                                    {translate('continue')}
                                </button>
                                <button
                                    onClick={togglePopover}
                                    className={"cancel"}
                                >
                                    {translate('cancel')}
                                </button>
                            </div>
                        </div>
                    )}
                >
                    <button
                        className={"h5p-keywords-button-restart"}
                        onClick={togglePopover}
                    >
                        <span
                            className={"h5p-ri hri-restart"}
                            aria-hidden={"true"}
                        />
                        {translate('restart')}
                    </button>
                </Popover>
            )}
        </Fragment>
    );
}


export default Reset;