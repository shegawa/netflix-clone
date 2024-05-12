// import React, { useEffect, useState } from 'react';
// import './banner.css';
// import axios from '../../utils/axios';
// import requests from '../../utils/requests';
// const Banner = () => {
//     const [movie, setMovie] = useState({});
//     useEffect(() => {
//         (async () => {
//             try {
//                 const request = await axios.get(requests.fetchNetflixOriginials)
//                 setMovie(request.data.results[
//                     Math.floor(Math.random() * request.data.results.length)
//                 ]);
//             } catch (error) {
//                 console.log("error", error);
//             }
//         })()
//     }, []);
//     function truncate(str, n) {
//         return str?.length > n ? str.substr(0, n - 1) + '...' : str
//     }
//     return (
//         <div className='banner' style={{
//             backgroundSize: "cover",
//             backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//         }}>
//             <div className='banner-contents'>
//                 <h1 className='banner-tittle'>
//                     {movie?.title || movie?.name || movie?.original_name}
//                 </h1>
//                 <div className='banner-buttons'>
//                     <button className='banner-button-play'> play</button>
//                     <button className='banner-button'>My List</button>
//                 </div>
//                 <h1 className='banner-description'>{truncate(movie?.overview, 150)}</h1>
//             </div>
//             <div className='banner-fadeBottom' />
//         </div>
//     )
// }

// export default Banner



import React, { useEffect, useState } from 'react';
import './banner.css';
import axios from '../../utils/axios';
import requests from '../../utils/requests';

const Banner = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const movies = request.data.results;
                setMovie(movies[Math.floor(Math.random() * movies.length)]);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchMovie();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <div className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className='banner-contents'>
                <h1 className='banner-title'>
                    {movie ? (movie.title || movie.name || movie.original_name) : "Loading..."}
                </h1>
                <div className='banner-buttons'>
                    <button className='banner-button-play'>Play</button>
                    <button className='banner-button'>My List</button>
                </div>
                <h1 className='banner-description'>
                    {movie ? truncate(movie.overview, 150) : ""}
                </h1>
            </div>
            <div className='banner-fadeBottom' />
        </div>
    );
}

export default Banner;