import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SHELF_TYPES} from '../../constants';

export default class BookSelectSection extends PureComponent {

    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        onChange: () => {
        }
    };

    render() {
        const {onChange} = this.props;

        return (
            <div className="book-shelf-changer">
                <select onChange={onChange}>
                    <option value={SHELF_TYPES.NONE} disabled>Move to...</option>
                    <option value={SHELF_TYPES.CURRENTLY_READING}>Currently Reading</option>
                    <option value={SHELF_TYPES.WANT_TO_READ}>Want to Read</option>
                    <option value={SHELF_TYPES.READ}>Read</option>
                    <option value={SHELF_TYPES.NONE}>None</option>
                </select>
            </div>
        )
    }
}