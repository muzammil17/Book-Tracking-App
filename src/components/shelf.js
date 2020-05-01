import React, { Component } from "react";
import Book from "./book";

class Shelf extends Component {
  render() {
    const { books, section, handleShelfChange } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{section}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books &&
                books.map((book) => (
                  <Book
                    key={book.id}
                    imageUrl={book.imageLinks.smallThumbnail}
                    title={book.title}
                    author={book.authors}
                    handleShelfChange={handleShelfChange}
                    id={book.id}
                    book={book}
                    currentShelf={book.shelf}
                  />
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;
