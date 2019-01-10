import React from "react";
import { connect } from "react-redux";
import { setFilteredResults } from "../store";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      currentFilterOption: "Title",
      currentFilterValue: "",
      filters: []
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
      filters
    });
  };

  removeFilter = event => {
    const currentFilters = [...this.state.filters];
    const revisedFilters = currentFilters.filter(
      (filter, index) => index !== Number(event.target.value)
    );
    this.setState({
      filters: revisedFilters
    });
  };

  refineResultList = () => {
    let refinedList = [...this.props.searchResults];
    this.state.filters.forEach(filter => {
      const filterPattern = new RegExp(filter.value, "i");
      if (filter.option === "Title") {
        refinedList = refinedList.filter(book => {
          return filterPattern.test(book.title);
        });
      } else if (filter.option === "Author") {
        refinedList = refinedList.filter(book => {
          return filterPattern.test(
            //depending on the search conducted (author, title, or subject), the result variable name differs
            book.author_name
              ? book.author_name[0]
              : book.authors
              ? book.authors[0].name
              : "N/A"
          );
        });
      } else if (filter.option === "First Published") {
        refinedList = refinedList.filter(book => {
          return filterPattern.test(
            //not every result will have a publishing year
            book.first_publish_year ? book.first_publish_year : "N/A"
          );
        });
      }
    });
    this.props.setFilteredResults(refinedList);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.filters.length - prevState.filters.length !== 0 &&
      this.state.filters[this.state.filters.length - 1] !==
        prevState.filters[prevState.filters.length - 1]
    ) {
      this.refineResultList();
    }
  }

  render() {
    const filterOptions = ["Title", "Author", "First Published"];
    return (
      <div className="refine-step">
        <h3>Filter</h3>
        <form className="filter-form" onSubmit={this.addFilter}>
          <input
            className="filter-value"
            type="text"
            placeholder={"Refine here"}
            onChange={this.updateFilterValue}
          />
          <select
            className="filter-category"
            onChange={this.updateFilterOption}
          >
            {filterOptions.map(option => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <button
            className="filter-button"
            type="submit"
            disabled={this.state.currentFilterValue === ""}
          >
            Add
          </button>
        </form>
        <h4>Current filters:</h4>
        <div className="selection-box">
          {this.state.filters.map((filter, index) => {
            return (
              <div key={index}>
                <button
                  className="remove-refinement"
                  type="button"
                  value={index}
                  onClick={this.removeFilter}
                >
                  {filter.option}: {filter.value} x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    searchResults: state.book.searchResults
  };
};

const mapDispatch = dispatch => {
  return {
    setFilteredResults: results => {
      dispatch(setFilteredResults(results));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Filter);
