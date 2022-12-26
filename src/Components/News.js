import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static defaultProps = {
    pageSize: 8,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsApp`
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

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  //   this.setState({ loading: true })
  //   let data = await fetch(url)
  //   let parsedData = await data.json()
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })

  // }

  // handleNextClick = async () => {

  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults.totalResults / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  //     this.setState({ loading: true })
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     console.log(parsedData);

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })
  //   }
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=faa56937f6c543e58e4bdd19ce3669a5&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    let data = await fetch(url)
    let parsedData = await data.json()

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };



  render() {
    return (
      <>
        {/* <div className='container my-3'>
          <div className="container align-items-center"> */}
            <div className="text-center">
              <h1 className='mb-4'>NewsApp - Top Headlines on {this.capitalize(this.props.category)}</h1>
            </div>
            {this.state.loading &&  <Spinner/>}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner />}
            >
              <div className="container">
                <div className="row">

                  {this.state.articles.map((element) => {
                    let date = element.publishedAt.split('T')[0].split('-')
                    return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title != null ? element.title.slice(0, 61) : ""} description={element.description != null ? element.description.slice(0, 95) : ""} imageUrl={element.urlToImage} newsUrl={element.url} time={`${date[2]}/${date[1]}/${date[0]}`} sourceName={element.source.name} />
                    </div>
                  })}
                </div>
              </div>

            </InfiniteScroll>
          {/* </div>
        </div> */}
      </>
    )
  }
}

export default News
