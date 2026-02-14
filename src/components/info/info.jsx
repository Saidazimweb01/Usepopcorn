import { useEffect, useState } from "react"
import "./info.css"

let KEY = "e4b5a9c9"

export default function Info({ selectedFilm, setSelectedFilm, setWatched, watched }) {
    const [movie, setMovie] = useState([])
    const [isTrue, setIsTrue] = useState(true)
    // const [loadingTwo, setLoadingTwo] = useState(false)


    // console.log(elId);

    useEffect(() => {

        fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedFilm}`).then((res) => {
            return res.json()
        }).then((data) => {
            setMovie(data)
        })

    }, [selectedFilm])


    function handleSubmit() {
        let newObj = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Poster: movie.Poster,
            Runtime: movie.Runtime,
            imdbRating: movie.imdbRating

        }

        setWatched([...watched, newObj])
        setSelectedFilm(null)
    }


    function deleteFilm(id) {
        let isSure = watched.find((el) => {
            return el.imdbID == id
        })

        let confirmation = confirm(`Are you sure delete ${isSure.Title} film?`)

        if (confirmation) {
            let newFilteredFilms = watched.filter((el) => {
                return el.imdbID !== id
            })
            setWatched(newFilteredFilms)
        }

    }

    let isWatched = watched.some((el) => el.imdbID == selectedFilm)

    let middleRaiting = watched.reduce((total, el) => {
        return total + +el.imdbRating / watched.length
    }, 0)
    let middleTime = watched.reduce((total, el) => {
        return total + +el.Runtime.split(" ")[0] / watched.length
    }, 0)

    // let watchedFilm = watched.find((el)=> el.imdbID == watched.imdbID)

    return (
        <>
            <div className="hero-info">
                <button className="hero-info-favourite-top__closeoropen" onClick={() => setIsTrue(!isTrue)}>{isTrue ? "-" : "+"}</button>

                {/* //moreinfo:----------------------------------------------------- */}

                {
                    isTrue && (

                        !selectedFilm ? (
                            <>
                                <div className="hero-info-favourites-top">
                                    <div className="hero-info-favourites-top__inner">
                                        <h2 className="hero-info-favourites-top__title">MOVIES YOU WATCHED</h2>
                                    </div>
                                    <div className="hero-info-favourites-information">
                                        <p className="hero-info-favourites-information__countfilms"><span className="hero-info-favourites__still">#️⃣</span> {watched.length} movies</p>
                                        <p className="hero-info-favourites-information__raiting">⭐
                                            {
                                                watched.length > 0 ? middleRaiting.toFixed(2) : 0
                                            }
                                        </p>
                                        <p className="hero-info-favourites-information__sweat">🌟 5.00</p>
                                        <p className="hero-info-favourites-information__min"><span className="hero-info-favourites__still">⌛</span>
                                            {watched.length > 0 ? middleTime.toFixed(2) : 0 + " "}
                                            <br />
                                            min</p>
                                    </div>
                                </div>
                                <ul className="hero-info-favourite__cards">
                                    {
                                        !watched.length ? <>
                                            <p className="hero-info-favourite__status">
                                                You don't have watched movies yet
                                            </p>
                                        </> :
                                            watched.map((el) => (
                                                <li key={el.imdbID} onClick={() => setSelectedFilm(el.imdbID)} className="hero-info-favourite__item">
                                                    <div className="hero__inner">
                                                        <div className="hero-info-favourite-box" >
                                                            <img
                                                                width={100} height={150}
                                                                src={el.Poster} alt="" />
                                                            <div className="hero-info-favourite__infos">
                                                                <div className="hero-info-favourite__inner-title">
                                                                    <h3>{el.Title}</h3>
                                                                </div>
                                                                <div className="hero-info-favourite__inner-text">
                                                                    <p className="hero-info-favourite__star">⭐ {el.imdbRating}</p>
                                                                    <p className="hero-info-favourite__swet">🌟 8</p>
                                                                    <p className="hero-info-favourite__time">⌛ {el.Runtime}</p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="hero-info-favourite__cancel" onClick={(e) => e.stopPropagation()}>
                                                            <button className="hero-info-favourite__cancel-btn" onClick={() => deleteFilm(el.imdbID)}>X</button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </>
                        ) : (
                            <>
                                <div className="hero-info__top">
                                    <img width={150} height={220} src={movie.Poster} alt="" />
                                    <div className="hero-info-top__inner">
                                        <h2 className="hero-info-top__title">
                                            {movie.Title}
                                        </h2>
                                        <button className="hero-info-top__back" onClick={() => setSelectedFilm(null)}>Back</button>
                                        {/* <button className="hero-info-top__minus" >-</button> */}

                                        <p className="hero-info-top__released">{movie.Released} . {movie.Runtime}</p>
                                        <p className="hero-info-top__genre">{movie.Genre}</p>
                                        <p className="hero0info-top__imdb__raiting">⭐  {movie.imdbRating} IMDb raiting</p>
                                    </div>
                                </div>

                                <div className="hero-info-text">
                                    <div className="hero-info-text__raiting">
                                        <div className="hero-info-text-raiting__inner">
                                            {
                                                isWatched ? (
                                                    <>
                                                        <div>
                                                            <p>
                                                                This film has already in watched movies
                                                            </p>
                                                            <button className="hero-info-favourite__btn" onClick={() => deleteFilm(movie.imdbID)}>Delete this film ?</button>
                                                        </div>


                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <p className="hero-info-text__star">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</p>
                                                            <p className="hero-info-text__count">10</p>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        {
                                            !isWatched && (
                                                <div className="hero-info-text-add__box">
                                                    <button className="hero-info-text__add" onClick={handleSubmit}>+ Add to list</button>
                                                </div>
                                            )
                                        }

                                    </div>



                                    <div className="hero-info-text__plot">
                                        <p className="hero-info-text__plot-text">{movie.Plot}</p>
                                        <p className="hero-info-text__actors">Actors: {movie.Actors}</p>
                                        <p className="hero-info-text__director">Directed by {movie.Director}</p>
                                    </div>
                                </div>

                            </>
                        )
                    )
                }

                {/* //moreinfo/>----------------------------------------------------- */}


                {/* favourties:---------------------------------------------------------- */}

                {/* <div className="hero-info-favourites-top">
                    <div className="hero-info-favourites-top__inner">
                        <h2 className="hero-info-favourites-top__title">MOVIES YOU WATCHED</h2>
                        <button className="hero-info-favourite-top__closeoropen">-</button>
                    </div>
                    <div className="hero-info-favourites-information">
                        <p className="hero-info-favourites-information__countfilms"><span className="hero-info-favourites__still">#️⃣</span> 2  movies</p>
                        <p className="hero-info-favourites-information__raiting">⭐ 7.85</p>
                        <p className="hero-info-favourites-information__sweat">🌟 5.00</p>
                        <p className="hero-info-favourites-information__min"><span className="hero-info-favourites__still">⌛</span> 157.50 min</p>
                    </div>
                </div> */}


                {/* favourites/>------------------------------------------------------------ */}


            </div>
        </>
    )
}