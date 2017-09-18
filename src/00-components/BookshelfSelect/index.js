import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SHELF_TYPES} from '../../constants';

export default class BookshelfSelect extends PureComponent {

    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        value: SHELF_TYPES.NONE,
        onChange: () => {
        }
    };

    onChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {value} = this.props;

        return (
            <div className="book-shelf-changer">
                <select onChange={this.onChange} value={value}>
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