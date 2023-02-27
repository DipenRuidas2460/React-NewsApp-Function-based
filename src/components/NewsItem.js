import React from "react";
import { Link } from "react-router-dom";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
            className="badge rounded-pill bg-danger"
          >
            {source}
          </span>
        </div>
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://c.ndtvimg.com/2023-02/bgrl46no_seattle-caste-discrimination_625x300_22_February_23.jpg"
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {title} <span className="badge text-bg-success">Success</span>
          </h5>
          <p className="card-text">{description}</p>
          <p className="class-text">
            <small className="text-danger">
              By {author ? author : "Unknown"} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <Link to={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
