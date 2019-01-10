import React from "react";
import { connect } from "react-redux";
import SearchResults from "./search-results";
import { setSearchValue, fetchSearchResults } from "../store";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchCategory: "Title", //choices are title, author, and subject
      searchPlaceholder: "Enter book title here",
      showSearchResults: false,
      searchValue: ""
    };
  }

  updateSearchValue = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  updateSearchCategory = event => {
    switch (event.target.value) {
      case "Title":
        this.setState({
          searchCategory: "Title",
          searchPlaceholder: "Enter book title here"
        });
        break;
      case "Author":
        this.setState({
          searchCategory: "Author",
          searchPlaceholder: "Enter book author here"
        });
        break;
      case "Subject":
        this.setState({
          searchCategory: "Subject",
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
    this.props.setSearchValue(this.state.searchValue);
    this.props.fetchSearchResults(formattedValue, this.state.searchCategory);
    this.setState({ showSearchResults: true });
  };

  render() {
    const searchOptions = ["Title", "Author", "Subject"];
    return (
      <div className="search">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-bar"
            type="text"
            placeholder={this.state.searchPlaceholder}
            onChange={this.updateSearchValue}
          />
          <select
            className="search-category"
            onChange={this.updateSearchCategory}
          >
            {searchOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            className="search-button"
            type="submit"
            disabled={this.state.searchValue === ""}
          >
            Search
          </button>
        </form>
        {this.state.showSearchResults && <SearchResults />}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    setSearchValue: value => dispatch(setSearchValue(value)),
    fetchSearchResults: (value, category) =>
      dispatch(fetchSearchResults(value, category))
  };
};

export default connect(
  null,
  mapDispatch
)(SearchBar);
