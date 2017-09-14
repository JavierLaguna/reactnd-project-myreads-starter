import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './00-components/SearchBooks';
import BookshelfSection from './00-components/BookshelfSection';
import * as BooksAPI from './BooksAPI';
import {SHELF_TYPES} from './constants';

export default class BooksApp extends React.Component {

    state = {
        books: [],
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books
            });
        });
    }

    render() {
        const {books} = this.state;
        let booksByShelf = {
            [SHELF_TYPES.CURRENTLY_READING]: [],
            [SHELF_TYPES.WANT_TO_READ]: [],
            [SHELF_TYPES.READ]: []
        };

        books.map((book) => {
            booksByShelf[book.shelf].push(book);
        });

        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <SearchBooks/>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookshelfSection title='Currently Reading'
                                                  books={booksByShelf[SHELF_TYPES.CURRENTLY_READING]}
                                />
                                <BookshelfSection title='Want to Read'
                                                  books={booksByShelf[SHELF_TYPES.WANT_TO_READ]}
                                />
                                <BookshelfSection title='Read'
                                                  books={booksByShelf[SHELF_TYPES.READ]}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
