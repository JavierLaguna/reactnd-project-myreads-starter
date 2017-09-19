import React from 'react'
import BookshelfSection from '../../00-components/BookshelfSection';
import Loading from '../../00-components/Loading';
import * as BooksAPI from '../../BooksAPI';
import {SHELF_TYPES} from '../../constants';

export default class MyReads extends React.Component {

    state = {
        books: [],
        isLoading: true
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books,
                isLoading: false
            });
        });
    }

    updateBook = (bookToUpdate, newShelf) => {
        this.setState({isLoading: true});
        BooksAPI.update(bookToUpdate, newShelf).then((data) => {
            this.setState((prevState) => ({
                isLoading: false,
                books: prevState.books.map((book) => {
                    if (book.id === bookToUpdate.id) {
                        book.shelf = newShelf
                    }
                    return book;
                })
            }));
        });
    };

    render() {
        if (this.state.isLoading) {
            return (<Loading/>);
        }

        const {books} = this.state;
        let booksByShelf = {
            [SHELF_TYPES.CURRENTLY_READING]: [],
            [SHELF_TYPES.WANT_TO_READ]: [],
            [SHELF_TYPES.READ]: [],
            [SHELF_TYPES.NONE]: []
        };

        books.map((book) => {
            booksByShelf[book.shelf].push(book);
            return null;
        });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookshelfSection title='Currently Reading'
                                          books={booksByShelf[SHELF_TYPES.CURRENTLY_READING]}
                                          onChangeShelf={this.updateBook}
                        />
                        <BookshelfSection title='Want to Read'
                                          books={booksByShelf[SHELF_TYPES.WANT_TO_READ]}
                                          onChangeShelf={this.updateBook}
                        />
                        <BookshelfSection title='Read'
                                          books={booksByShelf[SHELF_TYPES.READ]}
                                          onChangeShelf={this.updateBook}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                </div>
            </div>

        )
    }
}
