import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class BookshelfSection extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        // children: PropTypes.array,
    };

    static defaultProps = {
        title: ''
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    {this.props.children}
                </div>
            </div>
        )
    }
}