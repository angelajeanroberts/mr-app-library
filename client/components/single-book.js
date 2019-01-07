import React from "react";
import { connect } from "react-redux";
import { fetchSelectedBook } from "../store";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 80,
    height: theme.spacing.unit * 50,
    backgroundColor: "white",
    padding: theme.spacing.unit * 4,
    borderRadius: 40,
    "&:focus": {
      outline: 0
    }
  }
});

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
    console.log("selectedBook", selectedBook);
    return (
      <div>
        {selectedBook.error ? (
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
          >
            <div className={this.props.classes.paper}>
              <Typography>{selectedBook.error}</Typography>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleClose}
                // className={classes.button}
              >
                Close
              </Button>
            </div>
          </Modal>
        ) : selectedBook.title ? (
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
          >
            <div className={this.props.classes.paper}>
              <Typography>
                {selectedBook.title && selectedBook.title}
              </Typography>
              <Typography>
                {selectedBook.authors && selectedBook.authors[0].name}
              </Typography>
              <Typography>
                {selectedBook.publish_date && selectedBook.publish_date}
              </Typography>
              <Typography>
                {selectedBook.description && selectedBook.description}
              </Typography>
              <img
                src={
                  selectedBook.covers
                    ? `http://covers.openlibrary.org/b/id/${
                        selectedBook.covers[0]
                      }-M.jpg`
                    : 'https://drive.google.com/open?id=1TTn9-leOPctUs8j-Ej3501-N3o0CgTEq'
                }
              />
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.handleClose}
                // className={classes.button}
              >
                Close
              </Button>
            </div>
          </Modal>
        ) : (
          <div>Loading information...</div>
        )}
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
)(withStyles(styles)(SingleBook));
