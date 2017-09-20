import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BooksGrid from '../BooksGrid';

export default class BookshelfSection extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    static defaultProps = {
        title: '',
        books: [],
        onChangeShelf: () => {
        }
    };

    render() {
        const {books, onChangeShelf} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={books} onChangeShelf={onChangeShelf}/>
                </div>
            </div>
        )
    }
}