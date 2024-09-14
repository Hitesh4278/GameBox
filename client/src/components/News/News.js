import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { NavBar } from '../Navbar/NavBar';
import '../../css/News.css';

export const News = () => {
    const [news, setNews] = useState([]);
    const [query, setQuery] = useState('pc games');
    const [loading, setLoading] = useState(false); 
    const [fromDate, setFromDate] = useState(getYesterdayDate());
    const [toDate, setToDate] = useState(getYesterdayDate()); 
    const apiKey = process.env.REACT_APP_NEWS_API;
    const isInitialMount = useRef(true); // Track initial mount

    function getYesterdayDate() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
    }, []);

    const getNews = useCallback(() => {
        setLoading(true); 
        const newsUrl = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=${apiKey}`;
        axios
            .get(newsUrl)
            .then(response => {
                setNews(response.data.articles);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [query, fromDate, toDate, apiKey]);

    useEffect(() => {
        getNews();  
    }, [getNews]);

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
                    <div className="date-picker-container">
                        <label>From: </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className="date-input"
                        />
                        <label>To: </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className="date-input"
                        />
                    </div>
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                {loading ? ( 
                    <div className="loading-container">
                        <p>Loading...</p>
                    </div>
                ) : (
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
                )}
            </div>
        </>
    );
};
