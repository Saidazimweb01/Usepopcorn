import { useState } from "react"
import Movie from "../movie/movie"
import "./movieslist.css"



export default function Movieslist({ films, setSelectedFilm, selectedFilm, loading, setLoading, searches }) {

    const [isTrue, setIsTrue] = useState(true)

    let notFound = !loading && films.length == 0
    let hasFilm = !loading && films.length > 0

    return (
        <>
            {/* <span className="loader"></span> */}
            <ul className="hero__list">
                <button className="hero__closeoropen" onClick={() => setIsTrue(!isTrue)}>{isTrue ? "-" : "+"}</button>
                {
                    loading && (
                        <div className={loading ? "hero__list__loader-box block" : "hero__list__loader-box"}>
                            {loading && <span className="loader"></span>}
                        </div>
                    )
                }

                {notFound && isTrue && (
                    <p className="hero__status">
                        "{searches}" film not found
                    </p>
                )}
                {
                
                        hasFilm && isTrue && (
                            films.map((el, index) => (
                                <Movie films={el} key={index} setSelectedFilm={setSelectedFilm} selectedFilm={selectedFilm} />
                            ))
                        )
                }
            </ul>
        </>
    )
}