import React from "react";
import Shelf from "./shelf";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const { shelfs, handleShelfChange } = props;
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              section="currently Reading"
              handleShelfChange={handleShelfChange}
              books={shelfs.currentlyReading}
            />
            <Shelf
              section="Want to Read"
              handleShelfChange={handleShelfChange}
              books={shelfs.wantToRead}
            />
            <Shelf
              section="Read"
              handleShelfChange={handleShelfChange}
              books={shelfs.read}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
