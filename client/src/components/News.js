import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from './NavBar';

import '../Css/News.css';

export const News = () => {
    const newsUrl = `https://newsapi.org/v2/everything?q=game&apiKey=8329b6655aa74b9f86cbab15afb4a63d`;
    const [news, setNews] = useState([]);

    const getNews = () => {
        axios
            .get(newsUrl)
            .then(response => {
                setNews(response.data.articles);
                console.log(response.data.articles);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <>
            <NavBar />
            <div className="news-container">
                <h1>News</h1>
                {news.map((n ,index) => (
                    <div className="news-item" key={n.title}>
                        <h2 className="news-title">{index+1}. {n.title}</h2>
                        <span className="news-author">Author: <strong>{n.author}</strong></span>
                        <p className="news-description">{n.description}</p>
                        <a className="news-link" href={n.url} target="_blank" rel="noopener noreferrer">Read More</a>
                    </div>
                ))}
            </div>
        </>
    );
};
