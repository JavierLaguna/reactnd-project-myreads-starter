import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import BookshelfSection from '../../00-components/BookshelfSection';
import {SHELF_TYPES} from '../../constants';
import {Link} from 'react-router-dom';

export default class MyReads extends PureComponent {
    state = {};

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    };

    static defaultProps = {
        books: [],
        updateBook: () => {
        }
    };

    render() {
        const {books, updateBook} = this.props;
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
                                          onChangeShelf={updateBook}
                        />
                        <BookshelfSection title='Want to Read'
                                          books={booksByShelf[SHELF_TYPES.WANT_TO_READ]}
                                          onChangeShelf={updateBook}
                        />
                        <BookshelfSection title='Read'
                                          books={booksByShelf[SHELF_TYPES.READ]}
                                          onChangeShelf={updateBook}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>

        )
    }
}
