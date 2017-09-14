import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

export default class BookshelfSection extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    };

    static defaultProps = {
        title: '',
        books: []
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book, index) => (
                            <li key={index}>
                                <Book/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}