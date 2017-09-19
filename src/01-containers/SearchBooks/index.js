import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../BooksAPI';
import debounce from 'lodash.debounce';
import Loading from '../../00-components/Loading';
import './index.css';

export default class SearchBooks extends PureComponent {
    state = {
        books: [],
        isLoading: false
    };

    static propTypes = {
        goBack: PropTypes.func.isRequired
    };

    static defaultProps = {
        goBack: () => {
        }
    };

    onChangeSearchValue = (event) => {
        this.setState({isLoading: true});
        const {value} = event.target;
        this.searchBook(value);
    };

    searchBook = debounce((value) => {
        BooksAPI.search(value, 20).then((books) => {
            this.setState({
                books,
                isLoading: false
            });
        });
    }, 500);

    render() {
        const {goBack} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={goBack}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.onChangeSearchValue}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.isLoading ?
                        <Loading/>
                        :
                        <ol className="books-grid"/>
                    }
                </div>
            </div>
        )
    }
}