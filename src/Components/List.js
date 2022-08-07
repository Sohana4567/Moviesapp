import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from 'axios';
export default class List extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
      parr: [1],
      currPage: 1,
      favmov:[],
      movies:[]
    }
  }
  handleEnter=(id)=>{
    this.setState({
      hover:id
    })
  };
handleLeave=()=>{
  this.setState({
      hover:'',
  })
}
changeMovie=async ()=>{
  let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0da1dea89d13663bf3534f9ad60f1651&language=en-US&page=${this.state.currPage}`)
console.log(res)
this.setState({
    movies:[...res.data.results]
})
}
handleNext=()=>{
  console.log("I am  handling next")
  let tempArr=[];
  for(let i=1;i<=this.state.parr.length+1;i++){
    
    tempArr.push(i);
    
  }
  console.log(tempArr);
  this.setState({
    parr:[...tempArr],
    currPage:this.state.currPage+1
  })
  this.changeMovie();
}
handlePrev=()=>{
  if(this.state.currPage!=1){
  this.setState({
   
    currPage:this.state.currPage-1
  })
  this.changeMovie();
}
}
handleFavourite=(movieObj)=>{
  let localStoragemovie=JSON.parse(localStorage.getItem("movies")) || [];
  if(this.state.favmov.includes(movieObj.id)){
    localStoragemovie=localStoragemovie.filter(movie=>movie.id!=movieObj.id)
  }else{
    localStoragemovie.push(movieObj)
  }
  console.log("localstorage",localStoragemovie)
  localStorage.setItem("movies",JSON.stringify(localStoragemovie));
  let tempArr=localStoragemovie.map(movieObj=>movieObj.id);
  this.setState({
    favmov:[...tempArr]
  })
  console.log("fav",this.state.favmov);
}
handlePageNo=(pageNum)=>{
  this.setState({
    currPage:pageNum
  })
  this.changeMovie();
}
async  componentDidMount(){
let res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0da1dea89d13663bf3534f9ad60f1651&language=en-US&page=${this.state.currPage}`)
// console.log(res)
this.setState({
    movies:[...res.data.results]
})
}
  render() {
    //let movie = movies.results;
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movie-card"
                  onMouseEnter={() => this.handleEnter(movieObj.id)}
                  onMouseLeave={this.handleLeave}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top banner-img"
                    alt="..."
                    style={{ height: "40vh" }}
                  />
                  {/* <div className="card-body "> */}
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text movie-text">
                        {movieObj.overview}
                      </p> */}
                  <div className="button-wrapper">
                    {this.state.hover == movieObj.id && (
                      <a class="btn btn-danger movie-button"  onClick={()=>this.handleFavourite(movieObj)}>
                        {this.state.favmov.includes(movieObj.id)?"Remove from fav":"Add to Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handlePrev}>
                      Previous
                    </a>
                    </li>
                    {
                      this.state.parr.map(pageNum => (
                        <li class="page-item">
                          <a class="page-link" href="#"  onClick={()=>this.handlePageNo(pageNum)}>
                            {pageNum}
                          </a>
                        </li>
                      ))
                    }
                  <li class="page-item">
                    <a class="page-link"  onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}