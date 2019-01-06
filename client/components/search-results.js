import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import SingleBook from "./single-book";

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showSingleBook: false
    };
  }

  handleClick = event => {
    console.log(event.target.value);
    const bookIdx = event.target.value;
    const book = this.props.searchResults.filter((value, index) => index === bookIdx)[0]
    fetchSelectedBook(book);
    this.setState({
      showSingleBook: true
    });
  };

  render() {
    return (
      <div>
        <h1>Showing results for: {this.props.searchValue}</h1>
        {this.props.searchResults
          ? this.props.searchResults.map((book, index) => {
              return (
                <div key={index} value={index} onClick={this.handleClick}>
                  {book.title}
                </div>
              );
            })
          : <h1>"Loading results..."</h1>}
        {this.state.showSingleBook && <SingleBook />}
      </div>
    );
  }
}

const mapState = state => {
  return {
    searchResults: state.book.searchResults,
    searchValue: state.book.searchValue
  };
};

const mapDispatch = dispatch => {
  return {
    fetchSelectedBook: book => {
      dispatch(fetchSelectedBook(book));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(SearchResults);
