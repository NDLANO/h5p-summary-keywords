import React, {useRef} from 'react';
import PropTypes from 'prop-types';

function Essay(props) {

    const essayRef = useRef();

    props.registerReset(() => essayRef.current.value = '');
    props.export('essay', () => essayRef.current.value);

    return (
        <section>
            <h2 id={"essayHeader"}>{props.header}</h2>
            <textarea
                aria-labelledby={"essayHeader"}
                ref={essayRef}
            />
        </section>
    );
}

Essay.propTypes = {
    header: PropTypes.string,
    registerReset: PropTypes.func,
    export: PropTypes.func,
};

export default Essay;