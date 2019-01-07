import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import SingleBook from "./single-book";
import ScrollArea from "react-scrollbar";
import { Panel } from "react-bootstrap";
import { timingSafeEqual } from "crypto";

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showSingleBook: false,
      currentFilterOption: "",
      currentFilterValue: "",
      currentSortOption: "title",
      filters: [],
      sortSelections: []
    };
  }

  updateFilterOption = event => {
    this.setState({
      currentFilterOption: event.target.value
    });
  };

  updateFilterValue = event => {
    this.setState({
      currentFilterValue: event.target.value
    });
  };

  addFilter = event => {
    event.preventDefault();
    const filter = {
      option: this.state.currentFilterOption,
      value: this.state.currentFilterValue
    };
    const filters = [...this.state.filters, filter];
    this.setState({
      currentFilterOption: "",
      currentFilterValue: "",
      filters
    });
  };

  updateSortOption = event => {
    this.setState({
      currentSortOption: event.target.value
    });
  };

  addSort = event => {
    event.preventDefault();
    const sortSelections = [
      ...this.state.sortSelections,
      this.state.currentSortOption
    ];
    this.setState({
      sortSelections
    });
  };

  refineResultList = list => {
    let refinedList = [...list];
    this.state.filters.forEach(filter => {
      const filterPattern = new RegExp(filter.value, "i");
      if (filter.option === "title") {
        refinedList = refinedList.filter(book => {
          return filterPattern.test(book.title);
        });
      } else if (filter.option === "author") {
        refinedList = refinedList.filter(book => {
            return filterPattern.test(
              book.author_name
                ? book.author_name[0]
                : book.authors
                ? book.authors[0].name
                : "N/A"
            )
        });
      } else if (filter.option === "first published") {
        refinedList = refinedList.filter(book => {
          return filterPattern.test(
            book.first_publish_year ? book.first_publish_year : "N/A"
          );
        });
      }
    });
    this.state.sortSelections.forEach(sort => {
      refinedList.sort(function(a, b) {
        if (sort === "title") {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) return -1;
          else if (titleA > titleB) return 1;
          else return 0;
        } else if (sort === "author") {
          const authorA = a.author_name
            ? a.author_name[0].toUpperCase()
            : a.authors
            ? a.authors[0].name.toUpperCase()
            : "N/A";
          const authorB = b.author_name
            ? b.author_name[0].toUpperCase()
            : b.authors
            ? b.authors[0].name.toUpperCase()
            : "N/A";
          if (authorA < authorB) return -1;
          else if (authorA > authorB) return 1;
          else return 0;
        }
        else if(sort === 'first published') {
          const yearA = a.first_publish_year ? a.first_publish_year : "N/A"
          const yearB = b.first_publish_year ? b.first_publish_year : "N/A"
          if (yearA < yearB) return -1;
          else if (yearA > yearB) return 1;
          else return 0;
        }
      });
    });
    return refinedList;
  };

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
    const filterOptions = ["title", "author", "first published"];
    const refinedResults = this.refineResultList(this.props.searchResults);
    return (
      <div>
        <h1>Showing results for: "{this.props.searchValue}"</h1>
        <div>
          <form onSubmit={this.addFilter}>
            <div className="search-bar">
              <label>Filter by:</label>
              <select onChange={this.updateFilterOption}>
                {filterOptions.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
              <label>Value:</label>
              <input
                type="text"
                placeholder={`filter by ${this.state.currentFilterValue}`}
                onChange={this.updateFilterValue}
              />
            </div>
            <button type="submit">Add</button>
            <ul>
              Current filters:
              {this.state.filters.map((filter, index) => {
                return <li key={index}>{filter.value}</li>;
              })}
            </ul>
          </form>
          <form onSubmit={this.addSort}>
            <div className="search-bar">
              <label>Sort by:</label>
              <select onChange={this.updateSortOption}>
                {filterOptions.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit">Add</button>
            <ul>
              Current filters:
              {this.state.sortSelections.map((sortValue, index) => {
                return <li key={index}>{sortValue}</li>;
              })}
            </ul>
          </form>
        </div>
        {this.props.searchResults ? (
          <div className="scroll-element">
            <ScrollArea
              speed={0.8}
              contentClassName="content"
              horizontal={false}
            >
              {refinedResults.map((book, index) => {
                return (
                  <Panel key={index}>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        Title: {book.title}
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <div>
                        Author:{" "}
                        {book.author_name
                          ? book.author_name[0]
                          : book.authors
                          ? book.authors[0].name
                          : "N/A"}
                      </div>
                      <div>
                        First Published:{" "}
                        {book.first_publish_year
                          ? book.first_publish_year
                          : "N/A"}
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
        ) : (
          <h1>"Loading results..."</h1>
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
