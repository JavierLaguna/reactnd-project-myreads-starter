import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../BooksAPI';
import debounce from 'lodash.debounce';
import Loading from '../../00-components/Loading';
import BooksGrid from '../../00-components/BooksGrid';
import './index.css';

export default class SearchBooks extends PureComponent {
    state = {
        books: [],
        isLoading: false,
        searchValue: ''
    };

    static propTypes = {
        goBack: PropTypes.func.isRequired
    };

    static defaultProps = {
        goBack: () => {
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

    updateBook = (bookToUpdate, newShelf) => {
        this.setState({isLoading: true});
        BooksAPI.update(bookToUpdate, newShelf).then((data) => {
            this.setState((prevState) => ({isLoading: false}));
        });
    };

    render() {
        const {goBack} = this.props;
        const {books, searchValue} = this.state;

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
                        <BooksGrid books={books} onChangeShelf={this.updateBook}/>
                    }
                </div>
            </div>
        )
    }
}