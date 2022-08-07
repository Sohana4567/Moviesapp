import React, { Component } from "react";
import axios from "axios";

export default class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genre: [],
            currgenre: "All Genre",
            currText:"",
            limit:5
        }
    }
    async componentDidMount() {
        let res = JSON.parse(localStorage.getItem("movies"));
        // console.log(res)
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        }
        let genrearr = []
        res.map((movieObj) => {
            if (!genrearr.includes(genreId[movieObj.genre_ids[0]])) {
                genrearr.push(genreId[movieObj.genre_ids[0]]);
            }
        });
        genrearr.unshift("All Genre");
        this.setState({
            movies: [...res],
            genre: [...genrearr]
        });
    }
    handleCurrGenre=(genre)=>{
      this.setState({
        currgenre:genre
      })
    }
    sortPopularityAsc=()=>{
        let allmovies=this.state.movies;
        allmovies.sort((a,b)=>{
           return a.popularity-b.popularity;
        })
        this.setState({
            movies:[...allmovies]
        })
    }
    sortPopularityAsc=()=>{
        let allmovies=this.state.movies;
        allmovies.sort((a,b)=>{
           return a.popularity-b.popularity;
        })
        this.setState({
            movies:[...allmovies]
        })
    }

    sortPopularityDesc=()=>{
        let allmovies=this.state.movies;
        allmovies.sort((a,b)=>{
           return b.popularity-a.popularity;
        }) 
        this.setState({
            movies:[...allmovies]
        })
    }
    sortRatingAsc=()=>{
        let allmovies=this.state.movies;
        allmovies.sort((a,b)=>{
           return a.vote_average-b.vote_average;
        }) 
        this.setState({
            movies:[...allmovies]
        })
    }

    sortRatingDesc=()=>{
        let allmovies=this.state.movies;
        allmovies.sort((a,b)=>{
           return b.vote_average-a.vote_average;
        }) 
        this.setState({
            movies:[...allmovies]
        })
    }
    handleDelete=(id)=>{
         let newMovies=this.state.movies.filter((movieObj)=>{
            return movieObj.id!=id;
         })
         this.setState({
     movies:[...newMovies]
    })
    localStorage.setItem("movies",JSON.stringify(newMovies))
    }
  render() {
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        }
        let filterarr=this.state.movies;
            if(this.state.currText==""){
                filterarr=this.state.movies;
            }else{
                filterarr.filter((movieObj)=>{
                    let movieName=movieObj.original_title.toLowerCase();
                   return  movieName.includes(this.state.currText)
                })
            }
            if(this.state.currgenre!="All Genre"){
                filterarr=this.state.movies.filter(
                    (movieObj) =>genreId[movieObj.genre_ids[0]]==this.state.currgenre)
            }else{
                filterarr=this.state.movies
            }
        return (

            <div class="row">
                <div class="col-3 favourites-list">
                    <ul class="list-group">
                       {this.state.genre.map((genre)=>
                        this.state.currgenre==genre?(
                            <li class="list-group-item active"  aria-current="true">
                                {genre}
                            </li>
                        ):(
                            <li class="list-group-item"  aria-current="true" onClick={()=>this.handleCurrGenre(genre)}>
                                {genre}
                            </li>
                        )
                       )}
                    </ul>
                </div>
                <div class="col favourites-table">
                    
                    <div class="row">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                    <i
                      class="fa-solid fa-caret-up"
                      onClick={this.sortPopularityAsc}
                    />
                                        Popularity
                                        <i
                      class="fa-solid fa-caret-down"
                      onClick={this.sortPopularityDesc}
                    />
                                    </th>
                                    <th scope="col">
                                    <i
                      class="fa-solid fa-caret-up"
                      onClick={this.sortRatingAsc}
                    />
                                        Rating
                                        <i
                      class="fa-solid fa-caret-down"
                      onClick={this.sortRatingDesc}
                    />
                                        </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {filterarr.map((movieObj) => (

                                    <tr>

                                        <td scope="row">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                style={{ width: "8rem" }}
                                            />
                                            {movieObj.original_title}
                                        </td>
                                        <td>{genreId[movieObj.genre_ids[0]]}</td>
                                        <td>{movieObj.popularity}</td>
                                        <td>{movieObj.vote_average}</td>
                                        <td>
                                            <button class="btn btn-outline-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}