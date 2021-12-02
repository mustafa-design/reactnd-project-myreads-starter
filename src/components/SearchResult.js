import React from 'react'
import Book from './Book'

export default function SearchResult(props) {
    const { searchBooks, books, shelves, onMove, query } = props

    const updatedBooks = searchBooks.map(book => {
        books.map(b => {
            if (b.id === book.id) {
                book.shelf = b.shelf;
            }
            return b;
        });
        return book;
    });

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {updatedBooks.length === 0 && query !== ''
                    ? <p>No Matches</p>
                    : updatedBooks.map(book => (
                        <li key={`book-${book.id}`}>
                            <Book
                                book={book}
                                shelves={shelves}
                                shelf={book.shelf ? book.shelf : 'none'}
                                onMove={onMove} />
                        </li>))}
            </ol>
        </div>
    )
}
