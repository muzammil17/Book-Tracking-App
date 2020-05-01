import React from "react";
import * as BooksAPI from "./BooksAPI";
import Dashboard from "./components/dashboard";
import Search from "./components/search";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    shelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    book: null,
    shelf: "",
  };
  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        shelfs: {
          currentlyReading: data.filter(
            (book) => book.shelf === "currentlyReading"
          ),
          read: data.filter((book) => book.shelf === "read"),
          wantToRead: data.filter((book) => book.shelf === "wantToRead"),
        },
      });
    });
  }

  handleShelfChange = (book, shelf) => {
    this.setState({
      book,
      shelf,
    });
    this.forceUpdate();
    BooksAPI.update(book, shelf).then((data) => {
      book.shelf = shelf;
      const { wantToRead, read, currentlyReading } = this.state.shelfs;
      this.setState({
        shelfs: {
          read: read.filter((shelfBook) => shelfBook.id !== book.id),
          currentlyReading: currentlyReading.filter(
            (shelfBook) => shelfBook.id !== book.id
          ),
          wantToRead: wantToRead.filter(
            (shelfBook) => shelfBook.id !== book.id
          ),
          [`${shelf}`]: [...this.state.shelfs[`${shelf}`], book],
        },
      });
    });
  };

  render() {
    return (
      <React.Suspense>
        <Router>
          <Route
            path="/"
            exact
            render={() => (
              <Dashboard
                handleShelfChange={this.handleShelfChange}
                shelfs={this.state.shelfs}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                handleShelfChange={this.handleShelfChange}
                shelfs={this.state.shelfs}
              />
            )}
          />
        </Router>
      </React.Suspense>
    );
  }
}

export default BooksApp;
