import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    pageSize : 8,
    country : 'in',
    category : 'general'
  }

  static propTypes = {
    pageSize : PropTypes.number.isRequired,
    country : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
  }
  

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 20
    }
    console.log(this.state.totalResults);
  }


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }

  handleNextClick = async () => {

    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({ loading: true })
      let data = await fetch(url)
      let parsedData = await data.json()
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <div className="container align-items-center">
          <h1 className='mb-4'>NewsApp - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">

            {!this.state.loading && this.state.articles.map((element) => {
              let date = element.publishedAt.split('T')[0].split('-')
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title != null ? element.title.slice(0, 61) : ""} description={element.description != null ? element.description.slice(0, 95) : ""} imageUrl={element.urlToImage} newsUrl={element.url} time = {`${date[2]}/${date[1]}/${date[0]}`} sourceName = {element.source.name}/>
              </div>
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-2">
          <button hidden={this.state.loading} disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button hidden={this.state.loading} disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
