import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl} = this.props

    return (
      <>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-96479171,width-1070,height-580/photo.jpg" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a rel="noreferrer" href={newsUrl} target = "_blank" className="btn btn-primary">Read more</a>
            </div>
        </div>
      </>
    )
  }
}

export default NewsItem
