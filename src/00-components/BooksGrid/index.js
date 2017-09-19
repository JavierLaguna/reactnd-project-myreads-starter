import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';
import './index.css';

export default class BooksGrid extends PureComponent {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    static defaultProps = {
        books: [],
        onChangeShelf: () => {
        }
    };

    onChangeShelf = (id, newShelf) => {
        const bookToUpdate = this.props.books.filter((book) => book.id === id)[0];
        this.props.onChangeShelf(bookToUpdate, newShelf);
    };

    render() {
        const {books} = this.props;
        if(books.length === 0){
            return (<span className="bookshelf-books__no-books">No Books</span>)
        }
        return (
            <ol className="books-grid">
                {books.map((book, index) => (
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
        )
    }
}