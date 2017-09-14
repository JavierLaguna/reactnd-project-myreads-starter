import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import BookSelectSection from '../BookSelectSection';

export default class Book extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        imageUrl: PropTypes.string.isRequired
    };

    static defaultProps = {
        title: '',
        authors: [],
        imageUrl: ''
    };

    render() {
        const {title, authors, imageUrl} = this.props;
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
                    <BookSelectSection/>
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