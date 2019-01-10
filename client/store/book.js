import axios from "axios";

const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_SELECTED_BOOK = "SET_SELECTED_BOOK";
const SET_FILTERED_RESULTS = "SET_FILTERED_RESULTS";

const initialState = {
  searchValue: "",
  searchResults: [],
  selectedBook: {},
  filteredResults: []
};

const setSearchValue = value => {
  return {
    type: SET_SEARCH_VALUE,
    value
  };
};
const setSearchResults = results => {
  return {
    type: SET_SEARCH_RESULTS,
    results
  };
};
const setSelectedBook = book => {
  return {
    type: SET_SELECTED_BOOK,
    book
  };
};
const setFilteredResults = results => {
  return {
    type: SET_FILTERED_RESULTS,
    results
  };
};

export const fetchSearchValue = value => dispatch => {
  try {
    dispatch(setSearchValue(value));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchResults = (value, category) => async dispatch => {
  try {
    let response;
    let results;
    switch (category) {
      case "Title":
        response = await axios.get(
          `http://openlibrary.org/search.json?title=${value}`
        );
        results = response.data.docs;
        break;
      case "Author":
        response = await axios.get(
          `http://openlibrary.org/search.json?author=${value}`
        );
        results = response.data.docs;
        break;
      case "Subject":
        response = await axios.get(
          `http://openlibrary.org/subjects/${value.toLowerCase()}.json`
        );
        results = response.data.works;
        break;
      default:
        console.log("Invalid search category");
    }
    dispatch(setSearchResults(results));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedBook = book => async dispatch => {
  try {
    if (book.isbn) {
      const isbn = book.isbn[0];
      const bookDetails = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
      );
      dispatch(setSelectedBook(bookDetails.data[`ISBN:${isbn}`].details));
    } else {
      dispatch(setSelectedBook({ error: "Additional details unavailable" }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilteredResults = results => dispatch => {
  try {
    dispatch(setFilteredResults(results));
  } catch (error) {
    console.log(error);
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.value
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.results
      };
    case SET_SELECTED_BOOK:
      return {
        ...state,
        selectedBook: action.book
      };
    case SET_FILTERED_RESULTS:
      return {
        ...state,
        filteredResults: action.results
      };
    default:
      return state;
  }
}
