import { useState, useEffect } from 'react';
import React from 'react';

const ChelseaNews = () => {
    const [chelseaNews, setChelseaNews] = useState([]); //holds the posts-news being fetched by FETCH API
    const [showPastWeekNews, setShowPastWeekNews] = useState(false);

    useEffect(() => {
        const apiKey = '85fbe7a579214e8fb60e54036fae878e'; //generated API key from newsapi.org

        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7); //past 7 days of news

        // Format the dates in yyyy-MM-dd format
        const fromDate = weekAgo.toISOString().split('T')[0];
        const toDate = today.toISOString().split('T')[0];

        const apiUrl = showPastWeekNews ? `https://newsapi.org/v2/everything?q=chelsea&from=${fromDate}&to=${toDate}&apiKey=${apiKey}` :
            `https://newsapi.org/v2/everything?q=chelsea&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setChelseaNews(data.articles);
            })
            .catch((error) => {
                console.error('Error fetching Chelsea news:', error);
            });
    }, [showPastWeekNews]);
    return (
        <div>
            <h1>News about Chelsea Football Club</h1>
            <h4>
                <div className='buttonStyle'>
                    <button onClick={() => setShowPastWeekNews(!showPastWeekNews)}>
                        Show {showPastWeekNews ? 'All' : 'Past Week'} News
                    </button>
                </div>
            </h4>
            <div className='newsList'>
                {chelseaNews.map((article, index) => (
                    <div className='newsItem' key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt="Chelsea news" />
                            )}
                            <p>{article.title}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default ChelseaNews;