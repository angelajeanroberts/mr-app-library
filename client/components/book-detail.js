import React from "react";
import { FaImage } from "react-icons/fa";

const generateLabel = (label, value) => {
  let formattedValue = value;
  //the open library api does not include all fields for each book, this ensures the selected detail exists for the book
  if (!value) formattedValue = `${label} is unavailable`;
  //some values from the open library api are arrays (e.g. authors, langauges), this ensures all values are displayed
  if (Array.isArray(value)) formattedValue = formattedValue.join(", ");
  //the description field is unique in that it is an object, this ensures the description is shown
  if (typeof value === "object" && !Array.isArray(value)) {
    formattedValue = value.value;
  }
  return (
    <div key={label}>
      <b>{label}: </b> {formattedValue}
    </div>
  );
};

const DisplayDetail = props => {
  const selectedBook = props.selectedBook;
  //this can be changed if certain details would like to be added or removed
  const selectedDetail = [
    { label: "Title", value: selectedBook.title },
    {
      label: "Author",
      value: selectedBook.authors
        ? selectedBook.authors[0].name
        : selectedBook.authors
    },
    { label: "Publish Date", value: selectedBook.publish_date },
    { label: "Number of Pages", value: selectedBook.number_of_pages },
    { label: "Publisher", value: selectedBook.publishers },
    { label: "Subject", value: selectedBook.subjects },
    { label: "Description", value: selectedBook.description }
  ];
  return (
    <div className="detail-page">
      <div className="book-description">
        {selectedDetail.map(detail => {
          return generateLabel(detail.label, detail.value);
        })}
      </div>
      {selectedBook.covers ? (
        <img
          className="cover-image"
          src={`http://covers.openlibrary.org/b/id/${
            selectedBook.covers[0]
          }-M.jpg`}
        />
      ) : (
        <div className="image-unavailable">
          <FaImage size={98} />
          <div>Cover Image Unavailable</div>
        </div>
      )}
    </div>
  );
};

export default DisplayDetail;
