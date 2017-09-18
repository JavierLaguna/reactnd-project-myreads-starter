import React, {PureComponent} from 'react';
import "./loading.css";

export default class Loading extends PureComponent {
    render() {
        return (
            <div className="loading">
                <div className="loading__shadow"/>
                <div className="loading__content">
                    <div className="bookshelf_wrapper">
                        <ul className="books_list">
                            <li className="book_item first"/>
                            <li className="book_item second"/>
                            <li className="book_item third"/>
                            <li className="book_item fourth"/>
                            <li className="book_item fifth"/>
                            <li className="book_item sixth"/>
                        </ul>
                        <div className="shelf"/>
                    </div>
                </div>
            </div>
        )
    }
}