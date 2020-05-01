import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: this.props.currentShelf,
  };
  handleChange = (e) => {
    this.setState({ shelf: e.target.value });

    let shelf = e.target.value;
    const { handleShelfChange, book } = this.props;
    handleShelfChange(book, shelf);
  };

  render() {
    const { author, title, imageUrl } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${imageUrl})`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {author && author.map((writer, i) => <span key={i}>{writer}</span>)}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
