import React from 'react'
import './App.css'
import MyReads from './01-containers/MyReads';
import SearchBooks from './01-containers/SearchBooks';
import {Route} from 'react-router-dom';

export default class BooksApp extends React.Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <MyReads/>
                )}/>
                <Route path='/search' render={() => (
                    <SearchBooks/>
                )}/>
            </div>
        )
    }
}
