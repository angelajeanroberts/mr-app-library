import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import SingleBook from "./single-book";
import ScrollArea from "react-scrollbar";
import Filter from "./filter";
import Sort from "./sort";
import { Panel } from "react-bootstrap";

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showSingleBook: false
    };
  }

  showSingleBookDetail = event => {
    event.persist();
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
        {this.props.searchResults.length ? (
          <div className="result-list">
            <div className="scroll-element">
              <ScrollArea
                speed={0.8}
                contentClassName="content"
                horizontal={false}
              >
                {results.map((book, index) => {
                  return (
                    <Panel key={index}>
                      <Panel.Heading>
                        <Panel.Title className="list-title">
                          <b>Title:</b> {book.title}
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body className="list-item">
                        <div className="list-detail">
                          <div>
                            <b>Author:</b>{" "}
                            {book.author_name
                              ? book.author_name[0]
                              : book.authors
                              ? book.authors[0].name
                              : "N/A"}
                          </div>
                          <div>
                            <b>First Published:</b>{" "}
                            {book.first_publish_year
                              ? book.first_publish_year
                              : "N/A"}
                          </div>
                        </div>
                        <button
                          type="button"
                          value={book.key}
                          onClick={this.showSingleBookDetail}
                        >
                          Show More
                        </button>
                      </Panel.Body>
                    </Panel>
                  );
                })}
              </ScrollArea>
            </div>
            <div className="refine-results">
              <Filter />
              <Sort />
            </div>
          </div>
        ) : (
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
