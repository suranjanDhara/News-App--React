import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let { title, description, imageUrl, newsUrl, time, sourceName } = this.props

    return (
      <>
        <div className="card" style={{ margin: "10px 5px" }}>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left : '90%', zIndex : '1'}} >{sourceName}</span>
          <img style={{ height: '15rem' }} src={!imageUrl ? "https://img.etimg.com/thumb/msid-96479171,width-1070,height-580/photo.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text" style={{ height: '70px' }}>{description}{!description || description.length < 95 ? "" : "..."}</p>
            <h6 className="card-title">Date - {time}</h6>
            <div className="text-center my-1">
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
