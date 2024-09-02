import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from '../Navbar/NavBar';

import '../../css/News.css';

export const News = () => {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('games');

    const getNews = () => {
        const newsUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=8329b6655aa74b9f86cbab15afb4a63d`;
        axios
            .get(newsUrl)
            .then(response => {
                console.log(response)
                setNews(response.data.articles);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getNews();
    }, []);

    const handleSearch = () => {
        getNews(); 
    };

    return (
        <>
            <NavBar />
            <div className="news-container">
                <h1>News</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search for news..."
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                <div className="news-grid">
                    {news.map((n, index) => (
                        <div className="news-card" key={n.title}>
                            {n.urlToImage && (
                                <img src={n.urlToImage} alt={n.title} className="news-image" />
                            )}
                            <div className="news-content">
                                <h2 className="news-title">{index + 1}. {n.title}</h2>
                                <span className="news-author">Author: <strong>{n.author}</strong></span>
                                <p className="news-description">{n.description}</p>
                                <a className="news-link" href={n.url} target="_blank" rel="noopener noreferrer">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};