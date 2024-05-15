import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..." style={{ width: "100%", height: "250px" }} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5><span className="badge  bg-success" style={{ zIndex: "1", marginBottom: "10px" }}>
                        {source.name}
                    </span>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {(new Date(date)).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="link">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem