import React from 'react'

export default function SearchBar(props) {

    const { handleChange, query } = props

    return (


        <div className="search-books-input-wrapper">
            <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={handleChange}
            />
        </div>

    )
}

