import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BookshelfSelect from '../BookshelfSelect';

export default class Book extends PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        imageUrl: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    static defaultProps = {
        id: '',
        title: '',
        authors: [],
        imageUrl: '',
        shelf: '',
        onChangeShelf: () => {
        }
    };

    onChangeShelf = (newShelf) => {
        this.props.onChangeShelf(this.props.id, newShelf);
    };

    render() {
        const {title, authors, imageUrl, shelf} = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 192,
                             backgroundImage: `url(${imageUrl})`
                         }}
                    />
                    <BookshelfSelect value={shelf}
                                     onChange={this.onChangeShelf}
                    />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                    {authors.map((author, index) =>
                        <p key={index}>{author}</p>
                    )}
                </div>
            </div>
        )
    }
}