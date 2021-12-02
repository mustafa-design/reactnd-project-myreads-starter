import React, { Component } from 'react'

export default class Book extends Component {

    handleChange =  e => {
        this.props.onMove(this.props.book, e.target.value)
    }

    render() {
        const {
            book: {
                id,
                title,
                shelf,
                imageLinks,
                authors },
            shelves,
        } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks && imageLinks.thumbnail })` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf ? shelf : 'none'} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            {shelves && shelves.map(shelfOption => (
                                <option
                                    key={`option-${id}-${shelfOption.id}`}
                                    value={shelfOption.id}
                                >
                                    {shelfOption.title}
                                </option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.join(', ')}</div>
            </div>
        )
    }
}