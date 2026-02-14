import { useEffect, useState } from "react"
import "./app.css"
import Header from "../header/header"
import Movieslist from "../movieslist/movieslist"
import Info from "../info/info"


let KEY = "e4b5a9c9"
function App() {

  const [films, setFilms] = useState([])
  const [searches, setSearch] = useState("titanic")
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [watched, setWatched] = useState([])



  useEffect(() => {
    if (!searches) {
      setFilms([])
      return
    }

    setLoading(true)
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${searches}`).then((res) => {
      return res.json()
    }).then((data) => {
      setFilms(data.Search || [])
    }).finally(() => {
      setLoading(false)
    })
  }, [searches])

  console.log(films);
  console.log(searches);


  return (
    <>
      <Header setSearch={setSearch} search={searches} films={films} />
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-main">
              <Movieslist searches={searches} films={films} setSelectedFilm={setSelectedFilm} selectedFilm={selectedFilm} loading={loading} setLoading={setLoading} />
              <Info selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm} setWatched={setWatched} watched={watched} />
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

export default App