import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

export default class BookshelfSection extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    static defaultProps = {
        title: '',
        books: [],
        onChangeShelf: () => {
        }
    };

    onChangeShelf = (id, newShelf) => {
        const bookToUpdate = this.props.books.filter((book) => book.id === id)[0];
        this.props.onChangeShelf(bookToUpdate, newShelf);
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book, index) => (
                            <li key={index}>
                                <Book id={book.id}
                                      title={book.title}
                                      authors={book.authors}
                                      imageUrl={book.imageLinks.thumbnail}
                                      shelf={book.shelf}
                                      onChangeShelf={this.onChangeShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}