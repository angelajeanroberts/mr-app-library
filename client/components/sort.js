import React from "react";
import { connect } from "react-redux";
import { setFilteredResults } from "../store";

class Sort extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSortOption: "Title",
      sortSelections: []
    };
  }

  updateSortOption = event => {
    console.log("updateSortOption");
    this.setState({
      currentSortOption: event.target.value
    });
  };

  addSort = event => {
    console.log("addSort");
    event.preventDefault();
    const sortSelections = [
      ...this.state.sortSelections,
      this.state.currentSortOption
    ];
    this.setState({
      sortSelections
    });
  };

  removeSort = event => {
    const currentSortSelections = [...this.state.sortSelections]
    const revisedSortSelections = currentSortSelections.filter((sort, index) => index !== Number(event.target.value))
    console.log(revisedSortSelections)
    this.setState({
        sortSelections: revisedSortSelections
    })
}

  refineResultList = () => {
    console.log("refineResultList");
    let refinedList = this.props.filteredResults.length
      ? [...this.props.filteredResults]
      : [...this.props.searchResults];
    this.state.sortSelections.forEach(sort => {
      refinedList.sort(function(a, b) {
        let aValue;
        let bValue;
        if (sort === "Title") {
          aValue = a.title.toUpperCase();
          bValue = b.title.toUpperCase();
        }
        if (sort === "Author") {
          aValue = a.author_name
            ? a.author_name[0].toUpperCase()
            : a.authors
            ? a.authors[0].name.toUpperCase()
            : "N/A";
          bValue = b.author_name
            ? b.author_name[0].toUpperCase()
            : b.authors
            ? b.authors[0].name.toUpperCase()
            : "N/A";
        }
        if (sort === "First Published") {
          aValue = a.first_publish_year ? a.first_publish_year : 3000;
          bValue = b.first_publish_year ? b.first_publish_year : 3000;
        }
        if (aValue < bValue) return -1;
        else if (aValue > bValue) return 1;
        else return 0;
      });
    });
    this.props.setFilteredResults(refinedList);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sortSelections.length - prevState.sortSelections.length !== 0 &&
      this.state.sortSelections[this.state.sortSelections.length - 1] !==
      prevState.sortSelections[prevState.sortSelections.length - 1]
    ) {
      this.refineResultList();
    }
  }

  render() {
    const filterOptions = ["Title", "Author", "First Published"];
    return (
      <div className="refine-step">
        <h3>Sort</h3>
        <form className="sort-form" onSubmit={this.addSort}>
          <select className="filter-category" onChange={this.updateSortOption}>
            {filterOptions.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <button className="sort-button" type="submit">
            Add
          </button>
        </form>
        <h4>Currently sorted in order of:</h4>
        <div className="selection-box">
          {this.state.sortSelections.map((sortValue, index) => {
            return (
              <div key={index}>
                <button
                  className="remove-refinement"
                  type="button"
                  value={index}
                  onClick={this.removeSort}
                >
                  {sortValue} x
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
    searchResults: state.book.searchResults,
    filteredResults: state.book.filteredResults
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
)(Sort);
