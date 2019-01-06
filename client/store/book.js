import axios from "axios";

const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_SELECTED_BOOK = "SET_SELECTED_BOOK";

const initialState = {
  searchValue: "",
  searchResults: [],
  selectedBook: {}
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

export const fetchSearchValue = value => dispatch => {
  try {
    dispatch(setSearchValue(value));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchResults = (value, category) => async dispatch => {
  try {
    let response
    let results
    switch (category) {
      case 'title':
      response = await axios.get(`http://openlibrary.org/search.json?title=${value}`)
      results = response.data.docs
      break;
      case 'author':
      response =  await axios.get(`http://openlibrary.org/search.json?author=${value}`)
      results = response.data.docs;
      break;
      case 'subject':
      response =  await axios.get(`http://openlibrary.org/subjects/${value}.json`)
      results = response.data.works
      console.log('results', response)
      break;
      default:
        console.log('Invalid search category')
    }
    dispatch(setSearchResults(results));
  } catch (error) {
    console.log(error);
  }
};

export const fetchSelectedBook = book => dispatch => {
  try {
    dispatch(setSelectedBook(book));
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
    default:
      return state;
  }
}
