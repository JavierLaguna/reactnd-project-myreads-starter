import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './00-components/SearchBooks';
import BookshelfSection from './00-components/BookshelfSection';
import Book from './00-components/Book';
import * as BooksAPI from './BooksAPI';

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
            debugger
        });
    }

    render() {
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
                                <BookshelfSection title='Currently Reading'>

                                </BookshelfSection>

                                <BookshelfSection title='Want to Read'>

                                </BookshelfSection>

                                <BookshelfSection title='Read'>
                                    <Book/>
                                </BookshelfSection>

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
