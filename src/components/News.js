import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  let { country, category, apiKey, pageSize, setProgress } = props

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    setProgress(30);
    let parseData = await data.json();
    setProgress(70);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      category
    )} - NewsMonkey`;
    updateNews()
    // eslint-disable-next-line
  }, [])

  // const handlePreviousClick = async () => {
  //   setPage(page - 1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "80px 0px 30px 0px" }}>
        NewsMoney - Top {capitalizeFirstLetter(category)}{" "}
        Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((ele) => {
              return (
                <div className="col-md-4" key={ele.url}>
                  <NewsItem
                    title={ele.title ? ele.title : ""}
                    description={ele.description ? ele.description : ""}
                    imageUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                    source={ele.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};


export default News;
