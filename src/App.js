import React, {Component} from 'react'
import './App.css'
import MyReads from './01-containers/MyReads';
import SearchBooks from './01-containers/SearchBooks';
import {Route} from 'react-router-dom';
import Loading from './00-components/Loading';
import * as BooksAPI from './BooksAPI';


export default class BooksApp extends Component {
    state = {
        myBooks: [],
        isLoading: true
    };

    componentDidMount() {
        BooksAPI.getAll().then((myBooks) => {
            this.setState({
                myBooks,
                isLoading: false
            });
        });
    }

    updateBook = (bookToUpdate, newShelf) => {
        this.setState({isLoading: true});
        BooksAPI.update(bookToUpdate, newShelf).then((data) => {
            const {myBooks} = this.state;
            if (!(this.state.myBooks.find(myBook => myBook.id === bookToUpdate.id))) {
                myBooks.push(bookToUpdate);
            }

            this.setState({
                isLoading: false,
                myBooks: myBooks.map((book) => {
                    if (book.id === bookToUpdate.id) {
                        book.shelf = newShelf
                    }
                    return book;
                })
            });
        });
    };

    render() {
        const {isLoading, myBooks} = this.state;

        return (
            <div className="app">
                {isLoading && <Loading/>}
                <Route exact path='/' render={() => (
                    <MyReads books={myBooks}
                             updateBook={this.updateBook}
                    />
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBooks myBooks={myBooks}
                                 updateBook={this.updateBook}
                                 goBack={() => {
                                     history.push('/')
                                 }}
                    />
                )}/>
            </div>
        )
    }
}
