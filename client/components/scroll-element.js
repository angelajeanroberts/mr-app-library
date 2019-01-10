import React from "react";
import ScrollArea from "react-scrollbar";
import { Panel } from "react-bootstrap";

const ScrollElement = props => {
  const { results, showSingleBookDetail } = props;
  return (
    <ScrollArea speed={0.8}>
      {results.map((book, index) => {
        return (
          <Panel key={index}>
            <Panel.Heading>
              <Panel.Title className="list-title">
                <b>Title:</b> {book.title.slice(0, 51)}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body className="list-item">
              <div className="list-detail">
                <div>
                  <b>Author:</b>{" "}
                  {/* depending on the search conducted (author, title, or subject), the result variable name differs */}
                  {book.author_name
                    ? book.author_name[0]
                    : book.authors
                    ? book.authors[0].name
                    : "N/A"}
                </div>
                <div>
                  <b>First Published:</b>{" "}
                  {/* not every result will have a publishing year */}
                  {book.first_publish_year ? book.first_publish_year : "N/A"}
                </div>
              </div>
              <button
                className="list-button"
                type="button"
                value={book.key}
                onClick={showSingleBookDetail}
              >
                Show More
              </button>
            </Panel.Body>
          </Panel>
        );
      })}
    </ScrollArea>
  );
};

export default ScrollElement;
