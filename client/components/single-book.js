import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import Modal from "@material-ui/core/Modal";
import DisplayDetail from "./book-detail";

class SingleBook extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
  }

  handleClose = () => {
    this.props.fetchSelectedBook({});
    this.props.closeSingleBookDetail();
    this.setState({ open: false });
  };

  render() {
    const { selectedBook } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div className="single-book-modal">
            {/* not all books have additional detail available */}
            {selectedBook.error ? (
              <div className="unavailable-message">{selectedBook.error}</div>
            ) : selectedBook.title ? (
              <DisplayDetail selectedBook={selectedBook} />
            ) : (
              // appears while the async request is being made
              <div>Loading detail...</div>
            )}
            <button
              className="modal-button"
              type="button"
              onClick={this.handleClose}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapState = state => {
  return {
    selectedBook: state.book.selectedBook
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
)(SingleBook);
