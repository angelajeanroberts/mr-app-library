import React from "react";
import { connect } from "react-redux";

class SingleBook extends React.Component {
  render() {
    const { selectedBook } = this.props;
    return (
      <div>
        <p>{selectedBook.title}</p>
        <img />
      </div>
    );
  }
}

const mapState = state => {
  return {
    selectedBook: state.book.selectedBook
  };
};

export default connect(mapState)(SingleBook);
