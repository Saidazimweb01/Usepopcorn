import "./header.css"
import popcornLogo from "../../assets/popcorn.png"


export default function Header({ setSearch, searches, films }) {
    return (
        <>
            <header className="head">
                <div className="container">
                
                        <div className="head__box">
                            <a href="#">
                                <img width={50} height={65} src={popcornLogo} alt="" />
                                usePopcorn
                            </a>

                            <input type="text" onChange={(e) => setSearch(e.target.value)} value={searches} placeholder="Enter name of Film" className="head-search__input" />


                            <p className="head-founded__text">Found {films.length} results</p>
                        </div>

                   
                </div>
            </header>
        </>
    )
}