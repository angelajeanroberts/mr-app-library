import createHistroy from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

const history =
  process.env.NODE_ENV === "test" ? createMemoryHistory() : createHistroy();

export default history;
