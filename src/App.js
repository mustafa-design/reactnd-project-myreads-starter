import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search'
import Home from './components/Home'
import { Route } from 'react-router-dom'
import { debounce } from 'throttle-debounce'

const shelves = [
  {
    title: 'Currently Reading',
    id: 'currentlyReading'
  },
  {
    title: 'Want to Read',
    id: 'wantToRead'
  },
  {
    title: 'Read',
    id: 'read'
  }
]

class BooksApp extends React.Component {

  state = {
    books: [],
    searchBooks: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books })
  }

  moveBook = (book, shelf) => {
    
    BooksAPI.update(book, shelf);

    let updatedBooks = [];
    updatedBooks = this.state.books.filter(b => b.id !== book.id);

    if (shelf !== 'none') {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book);
    }

    this.setState({
      books: updatedBooks,
    });
  };

  arrayToObject = (array) => {
    const object = {}

    array.forEach(item => {
      object[item.id] = item
    })
    return object
  }

  searchForBooks = debounce(300, false, query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/'>
          <Home
            shelves={shelves}
            books={this.state.books}
            onMove={this.moveBook}
          />
        </Route>
        <Route path='/search'>
          <Search
            shelves={shelves}
            searchBooks={this.state.searchBooks}
            books={this.state.books}
            onMove={this.moveBook}
            onSearch={this.searchForBooks}
            onResetSearch={this.resetSearch}
          />
        </Route>
      </div>
    )
  }
}
export default BooksApp
