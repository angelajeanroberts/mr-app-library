import React from "react";
import { connect } from "react-redux";
import SearchResults from "./search-results";
import { fetchSearchValue, fetchSearchResults } from "../store";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchCategory: "title", //choices are title, author, and subject
      searchPlaceholder: "Enter book title here",
      showSearchResults: false,
      searchValue: ""
    };
  }

  updateSearchValue = event => {
    this.setState({
      searchValue: event.currentTarget.value
    });
  };

  updateSearchCategory = event => {
    switch (event.target.value) {
      case "title":
        this.setState({
          searchCategory: "title",
          searchPlaceholder: "Enter book title here"
        });
        break;
      case "author":
        this.setState({
          searchCategory: "author",
          searchPlaceholder: "Enter book author here"
        });
        break;
      case "subject":
        this.setState({
          searchCategory: "subject",
          searchPlaceholder: "Enter book subject here"
        });
        break;
      default:
        console.log("Invalid search category");
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const formattedValue = this.state.searchValue.replace(/\s/g, "+");
    this.props.fetchSearchValue(this.state.searchValue);
    this.props.fetchSearchResults(formattedValue, this.state.searchCategory);
    this.setState({ showSearchResults: true });
  };

  render() {
    const searchOptions = ["title", "author", "subject"];
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="search-bar">
            <label>Search:</label>
            <input
              type="text"
              placeholder={this.state.searchPlaceholder}
              onChange={this.updateSearchValue}
            />
          </div>
          {searchOptions.map(option => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name="searchOption"
                  value={option}
                  onChange={this.updateSearchCategory}
                />
                {option}
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
        {this.state.showSearchResults && <SearchResults />}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSearchValue: value => dispatch(fetchSearchValue(value)),
    fetchSearchResults: (value, category) =>
      dispatch(fetchSearchResults(value, category))
  };
};

export default connect(
  null,
  mapDispatch
)(SearchBar);
