import React, { useEffect, useState } from "react";
import { fireStoreDB } from "../config/firebaseConfig";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);

  // Read
  //   Refer to movies
  const moviesCollectionRef = collection(fireStoreDB, "movies");
  const getListMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("data ", filteredData);
      setMoviesData(filteredData);
    } catch (error) {
      console.log("Movies collection error: " + error);
    }
  };

  useEffect(() => {
    getListMovies();
  }, []);

  //   Create
  //   Post data in firebase DB
  const [movieTitle, setMovieTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState(0);
  const [rating, setRating] = useState(false);

  const submitMovie = async () => {
    try {
      const obj = {
        title: movieTitle,
        releaseDate: releaseDate,
        rating: rating,
      };

      await addDoc(moviesCollectionRef, obj);
      getListMovies()
    } catch (error) {
      console.log("error", error);
    }
  };

//   Delete a movie
const deleteMovie = async (id) => {
    try {
        const movieDoc = doc(fireStoreDB, "movies", id);
        await deleteDoc(movieDoc);
        getListMovies()
    } catch (error) {
        console.log("deleteMovie", error);
    }
}

// Update
const [updatedTitle, setUpdatedTitle] = useState('');
const updateDocTitle = async (id) => {
    try {
      const movieDoc = doc(fireStoreDB, "movies", id);
      await updateDoc(movieDoc, {
        title: updatedTitle
      });
      getListMovies();
    } catch (error) {
      console.log("Update", error);
    }
};

  return (
    <div>
      <h1>Movies</h1>

      <div>
        List Of Movies
        {moviesData.map((movie) => (
          <div>
            <h1>{movie.title}</h1>
            <h2>{movie.releaseDate}</h2>
            <h2>{movie.rating ? <h1>Good</h1> : ""}</h2>
            <div>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>
            </div>
            <div>
              <input
                placeholder="new Title"
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateDocTitle(movie.id)}>
                Update Movie
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h1 style={{ color: "red" }}>Movies to add</h1>
        <input
          value={movieTitle}
          placeholder="Movie Title ..."
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          value={releaseDate}
          placeholder="Release Date ..."
          type="number"
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <input
          value={rating}
          type="checkbox"
          //   checked= {rating}
          onChange={(e) => setRating(e.target.checked)}
        />

        <label>rating</label>

        <button onClick={submitMovie}>Submit Movie</button>
      </div>
    </div>
  );
};

export default Movies;
