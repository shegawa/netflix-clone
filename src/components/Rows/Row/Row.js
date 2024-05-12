import React, { useEffect, useState } from 'react';
import "./row.css";
import axios from '../../../utils/axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(fetchUrl);
                setMovies(response.data.results || []);
            } catch (error) {
                setError('Failed to fetch data');
                setMovies([]);
                console.error('Movie data fetch error:', error);
            }
            setLoading(false);
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get('v'));
                    }
                });
        }
    }

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="row">
            <div className="row-title">
                <h1>{title}</h1>
            </div>
            <div className="row-posters">
                {movies.map((movie, index) => (
                    <img
                        key={index}
                        onClick={() => handleClick(movie)}
                        src={`${imageBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
                    />
                ))}
            </div>
            {trailerUrl && (
                <div style={{ padding: '40px' }}>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </div>
    );
};

export default Row;