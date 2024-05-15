import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import newsImg from '../newimage.png'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [status, setStatus] = useState("ok");

    const updateNews = async () => {
        props.setProgress(10);
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(30);
        let data = await fetch(url);
        let parseData = await data.json();
        props.setProgress(75);
        setArticles(parseData.articles);
        setStatus(parseData.status);
        setTotalResult(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category === "general" ? "" : uppercaseFirstLetter(props.category)} - NewExpress`;
        updateNews();
        // eslint-disable-next-line
    }, []);


    const uppercaseFirstLetter = (word) => {
        let letter = word.charAt(0);
        letter = letter.toUpperCase();
        return letter + word.slice(1, word.lenght)
    }

    const fetchMoreData = async () => {
        setLoading(true);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parseData = await data.json();
        setStatus(parseData.status);
        setArticles(articles.concat(parseData.articles));
        setTotalResult(parseData.totalResults);
        setLoading(false);
    };


    return (
        <div className='my-3' >
            <h2 className='text-center my-3'>NewsMonkey - Top {props.category === "general" ? "" : uppercaseFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {status === "error" ? <><div className="container">NO News</div></> : (articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : newsImg} newsUrl={element ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source} />
                            </div>
                        }))}
                    </div>

                </div>
            </InfiniteScroll>
        </div>
    )

}



News.defaultProps = {
    country: 'in',
    pageSize: '6'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string
}


export default News