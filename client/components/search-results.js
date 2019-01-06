import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import SingleBook from "./single-book";
import ScrollArea from "react-scrollbar";
import { Panel } from "react-bootstrap";

class SearchResults extends React.Component {
  constructor() {
    super();
    this.state = {
      showSingleBook: false
    };
  }

  showSingleBookDetail = event => {
    event.persist()
    const bookIdx = Number(event.target.value);
    const book = this.props.searchResults.filter(
    (value, index) => index === bookIdx
    )[0];
    console.log('book', book)
    this.props.fetchSelectedBook(book);
    this.setState({
      showSingleBook: true
    });
  };

  closeSingleBookDetail = () => {
    this.setState({
      showSingleBook: false
    })
  }

  render() {
    return (
      <div>
        <h1>Showing results for: "{this.props.searchValue}"</h1>
        {this.props.searchResults ? (
          <div className="scroll-element">
            <ScrollArea
              speed={0.8}
              contentClassName="content"
              horizontal={false}
            >
              {this.props.searchResults.map((book, index) => {
                return (
                  <Panel key={index}>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        Title: {book.title}
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <div>Author: {book.author_name ? book.author_name[0] : book.authors ? book.authors[0].name : 'N/A'}</div>
                      <div>First Published: {book.first_publish_year ? book.first_publish_year : 'N/A'}</div>
                      <button type='button' value={index} onClick={this.showSingleBookDetail}>Show More</button>
                    </Panel.Body>
                  </Panel>
                );
              })}
            </ScrollArea>
          </div>
        ) : (
          <h1>"Loading results..."</h1>
        )}
        {this.state.showSingleBook && <SingleBook closeSingleBookDetail={this.closeSingleBookDetail}/>}
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
