import React from 'react'
import Book from './Book'

export default function Bookshelf(props) {
    const { title, books, shelves, onMove } = props

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {Object.keys(books).map(bookId => (
                        <li key={`book-${bookId}`}>
                            <Book
                                book={books[bookId]}
                                shelves={shelves}
                                onMove={onMove}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
