import { expect } from "chai";
import {
  setSearchValue,
  fetchSearchResults,
  fetchSelectedBook,
  setFilteredResults
} from "./book";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe("action creators and thunks", () => {
  let store;
  let filteredResults = [
    { title: "The Hobbit" },
    { title: "The Fellowship of the Ring" }
  ];

  const initialState = {
    searchValue: "",
    searchResults: [],
    selectedBook: {},
    filteredResults: []
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("setSearchValue", () => {
    it("should create an action to add the current searchValue", () => {
      store.dispatch(setSearchValue("The Hobbit"));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("SET_SEARCH_VALUE");
    });
  });

  describe("fetchSearchResults", () => {
    it("eventually dispatches the SET_SEARCH_RESULTS action", async () => {
      await store.dispatch(fetchSearchResults("The Hobbit", "Title"));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("SET_SEARCH_RESULTS");
    });
  });

  describe("fetchSelectedBook", () => {
    it("eventually dispatches the SET_SELECTED_BOOK action", async () => {
      await store.dispatch(
        fetchSelectedBook({ title: "The Hobbit", isbn: ["0006754023"] })
      );
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal("SET_SELECTED_BOOK");
    });
  });

  describe("setFilteredResults", () => {
    it("should create an action to add the current filteredResults", () => {
      store.dispatch(
        setFilteredResults(filteredResults)
      );
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_FILTERED_RESULTS');
    });
  });
});
