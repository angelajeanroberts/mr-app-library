import React from "react";
import SearchBar from './search-bar';

const LandingPage = () => {
  return (
    <div className='landing'>
      <h1>LOOKING FOR A BOOK? LET US HELP.</h1>
      <h3>Search by title, author, or subject.</h3>
      <SearchBar />
    </div>
  );
};

export default LandingPage;
