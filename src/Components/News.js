import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults : 20
    }
    console.log(this.state.totalResults);
  }


  async componentDidMount() {
    console.log("Hi");
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=1&pageSize=18"
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page - 1}&pageSize=18`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })

  }

  handleNextClick = async () => {

    if (this.state.page + 1 > Math.ceil(this.state.totalResults.totalResults / 18)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page + 1}&pageSize=18`
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='mb-4'>NewsApp - Top Headlines</h2>

        <div className="row">

          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title != null ? element.title.slice(0, 61) : ""} description={element.description != null ? element.description.slice(0, 95) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled= {(this.state.page + 1 > Math.ceil(this.state.totalResults / 18)) } type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
