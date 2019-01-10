import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import ScrollElement from "./scroll-element";
import SingleBook from "./single-book";
import Filter from "./filter";
import Sort from "./sort";

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showSingleBook: false
    };
  }

  showSingleBookDetail = event => {
    event.persist();
    //the book key is a unique identifier that Open Library uses for each work
    const bookKey = event.target.value;
    const selectedBook = this.props.searchResults.filter(
      book => book.key === bookKey
    )[0];
    this.props.fetchSelectedBook(selectedBook);
    this.setState({
      showSingleBook: true
    });
  };

  closeSingleBookDetail = () => {
    this.setState({
      showSingleBook: false
    });
  };

  render() {
    const results = this.props.filteredResults.length
      ? this.props.filteredResults
      : this.props.searchResults;
    return (
      <div className="search-results">
        <hr />
        <h3>Showing results for "{this.props.searchValue}"</h3>
        {/* if there is no match, we want to ensure the user knows */}
        {this.props.searchResults[0] === "No results found" ? (
          <h3>{this.props.searchResults[0]}</h3>
        ) : this.props.searchResults.length ? (
          <div className="result-list">
            <div className="results">
              <h3 className="results-subtitle">Results by Title</h3>
              <hr />
              <div className="scroll-element">
                <ScrollElement
                  results={results}
                  showSingleBookDetail={this.showSingleBookDetail}
                />
              </div>
            </div>
            <div className="refine-results">
              <h3 className="results-subtitle">Refine Selection</h3>
              <hr />
              <Filter />
              <Sort />
            </div>
          </div>
        ) : (
          // appears while the async request is being made
          <h3>"Loading results..."</h3>
        )}
        {this.state.showSingleBook && (
          <SingleBook closeSingleBookDetail={this.closeSingleBookDetail} />
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    searchResults: state.book.searchResults,
    searchValue: state.book.searchValue,
    filteredResults: state.book.filteredResults
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
