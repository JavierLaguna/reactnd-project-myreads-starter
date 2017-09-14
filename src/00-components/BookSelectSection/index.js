import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class BookSelectSection extends PureComponent {

    static propTypes = {
        //TODO
    };

    static defaultProps = {
        //TODO
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}