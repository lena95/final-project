import React from 'react';
import PropTypes from 'prop-types';

const FetchError = ({
                        message,
                        onRetry
                    }) => (
    <div>
        <div>
            {message}
        </div>
        <button className="button button-load" onClick={onRetry}>
            try again
        </button>
    </div>
);

FetchError.propTypes = {
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired
};

export default FetchError;