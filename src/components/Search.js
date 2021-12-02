import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'

class Search extends Component {

    state = { value: '' }

    handleChange = event => {
        const val = event.target.value;
        this.setState({ value: val }, () => {
            this.props.onSearch(val);
        });
    };

    // filterValidBooks = (booksArray) => {
    //     return booksArray.filter(book => (
    //         book.authors && book.imageLinks
    //     ))
    // }

    render() {
        const { shelves, onMove, onResetSearch, searchBooks, books } = this.props

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className='close-search' onClick={onResetSearch}>Close</Link>
                        <SearchBar
                            handleChange={this.handleChange}
                            query={this.state.value}
                        />
                    </div>
                </div>
                <SearchResult
                    books={books}
                    searchBooks={searchBooks}
                    shelves={shelves}
                    onMove={onMove}
                    query={this.state.value}
                />
            </div>
        )
    }
}

export default Search