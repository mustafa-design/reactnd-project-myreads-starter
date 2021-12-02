import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class Home extends Component {

    filterBooksByShelf = (booksObj, shelf) => {
        const filteredBooks = {}

        Object.keys(booksObj).map(bookId => {
            if (booksObj[bookId].shelf === shelf) {
                filteredBooks[bookId] = booksObj[bookId]
            }
        })

        return filteredBooks

    }

    render() {
        const { shelves, books, onMove } = this.props

        const booksByShelf = {}

        shelves.forEach(shelf => {
            booksByShelf[shelf.id] = this.filterBooksByShelf(books, shelf.id)
        })

        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves && shelves.map(shelf => (
                                <Bookshelf
                                    key={`shelf-${shelf.id}`}
                                    title={shelf.title}
                                    shelves={shelves}
                                    books={booksByShelf[shelf.id]}
                                    onMove={onMove}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a Book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home