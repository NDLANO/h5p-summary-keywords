import React, {Fragment, useContext, useState} from 'react';
import {KeywordsContext} from "context/KeywordsContext";

function Reset() {

    const [showPopover, setPopover] = useState(false);
    const keywordsContext = useContext(KeywordsContext);

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
        translations,
    } = keywordsContext;

    return (
        <Fragment>
            {enableRetry === true && (
                <button
                    className={"h5p-order-priority-button-restart"}
                    onClick={confirmReset}
                >
                        <span
                            className={"fa fa-refresh"}
                            aria-hidden={"true"}
                        />
                    {translations.restart}
                </button>
            )}
        </Fragment>
    );
}

export default Reset;