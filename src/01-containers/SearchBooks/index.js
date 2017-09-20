import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../BooksAPI';
import debounce from 'lodash.debounce';
import Loading from '../../00-components/Loading';
import BooksGrid from '../../00-components/BooksGrid';
import {SHELF_TYPES} from '../../constants';
import './index.css';

export default class SearchBooks extends PureComponent {
    state = {
        books: [],
        isLoading: false,
        searchValue: ''
    };

    static propTypes = {
        goBack: PropTypes.func.isRequired,
        myBooks: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    static defaultProps = {
        goBack: () => {
        },
        myBooks: [],
        updateBook: () => {
        }
    };

    onChangeSearchValue = (event) => {
        const {value} = event.target;
        this.setState({
            searchValue: value,
            isLoading: true
        });
        this.searchBook(value);
    };

    searchBook = debounce((value) => {
        BooksAPI.search(value, 20).then((books) => {
            if (books.error) {
                books = [];
            }
            this.setState({
                books,
                isLoading: false
            });
        });
    }, 500);

    render() {
        const {goBack, updateBook, myBooks} = this.props;
        const {books, searchValue} = this.state;

        const booksWithShelf = books.map((book) => {
            const myBook = myBooks.find(myBook => myBook.id === book.id);
            if (myBook) {
                book.shelf = myBook.shelf;
            } else {
                book.shelf = SHELF_TYPES.NONE;
            }
            return book;
        });

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={goBack}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={searchValue}
                               onChange={this.onChangeSearchValue}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.isLoading ?
                        <Loading/>
                        :
                        <BooksGrid books={booksWithShelf} onChangeShelf={updateBook}/>
                    }
                </div>
            </div>
        )
    }
}