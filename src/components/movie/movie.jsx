import "./movie.css"

export default function Movie({ films, setSelectedFilm, selectedFilm }) {


    console.log(selectedFilm);

    

    return (

        <>

            <li onClick={() => setSelectedFilm((c) => c === films.imdbID ? null : films.imdbID)} className="hero__item">
                <img width={50} height={65} src={films.Poster} alt="" />
                <div className="hero-text__box">
                    <h2 className="hero__title">
                        {films.Title}
                    </h2>
                    <p className="hero__year">
                        🗓️ {films.Year}
                    </p>
                </div>
            </li>

        </>
    )
}