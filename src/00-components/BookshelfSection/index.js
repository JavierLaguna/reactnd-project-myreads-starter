import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';
import './index.css';

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
        return ( //TODO refactor ol
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    {this.props.books.length !== 0 ?
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
                        :
                        <span className="bookshelf-books__no-books">No Books</span>
                    }
                </div>
            </div>
        )
    }
}