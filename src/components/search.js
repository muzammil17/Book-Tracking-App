import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./book";

import bg from "../icons/unnamed.jpg";

class Search extends Component {
  state = {
    books: [],
    query: "",
    shelfs: [],
  };

  componentDidMount() {
    let { currentlyReading, read, wantToRead } = this.props.shelfs;
    const shelfs = [...currentlyReading, ...read, ...wantToRead];
    if (shelfs.length !== 0) {
      this.setState({
        shelfs,
      });
      this.forceUpdate();
    } else {
      BooksAPI.getAll().then((data) => {
        this.setState({
          shelfs: [...data],
        });
      });
    }
  }

  handleChange = (e) => {
    let query = e.target.value;
    BooksAPI.search(query).then((data) => {
      if (Array.isArray(data)) {
        data.map((book) => {
          this.state.shelfs.map((b) => {
            if (book.id === b.id) {
              book.shelf = b.shelf;
            }
          });
        });
        this.setState({
          books: data,
        });
      } else {
        this.setState({
          books: [],
        });
      }
    });
  };

  render() {
    const { books } = this.state;
    return (
      <React.Suspense>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              {this.state.shelfs ? (
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={this.handleChange}
                />
              ) : (
                <div>Loading</div>
              )}
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {books.length !== 0
                ? books.map((book) => (
                    <Book
                      key={book.id}
                      imageUrl={
                        book.imageLinks ? book.imageLinks.smallThumbnail : bg
                      }
                      title={book.title}
                      author={book.authors}
                      handleShelfChange={this.props.handleShelfChange}
                      id={book.id}
                      book={book}
                      currentShelf={book.shelf ? book.shelf : "none"}
                    />
                  ))
                : null}
            </ol>
          </div>
        </div>
      </React.Suspense>
    );
  }
}

export default Search;
