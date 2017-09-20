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
            this.setState((prevState) => ({
                isLoading: false,
                myBooks: prevState.myBooks.map((book) => {
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

        const {myBooks} = this.state;

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <MyReads books={myBooks} updateBook={this.updateBook}/>
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBooks goBack={() => {
                        history.push('/')
                    }}/>
                )}/>
            </div>
        )
    }
}
