import React from 'react';
import PropTypes from 'prop-types';

function UpdateCard({ cardId, onUpdate }) {
    return (
        <div>
            <h1>Update Card {cardId}</h1>
            <button onClick={onUpdate}>Update</button>
        </div>
    );
}
//
// UpdateCard.propTypes = {
//     cardId: PropTypes.number.isRequired,
//     onUpdate: PropTypes.func.isRequired,
// };

export default UpdateCard;
