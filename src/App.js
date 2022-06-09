import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState('everything');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {

      try {
        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)
        const articles = await res.json();
        console.log(articles.response.docs);
        setArticles(articles.response.docs);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchArticles()
  }, [term])
  return (
    <>
      <div className="showcase">
        <div className="overlay px-5">

          <h1 className="text-4xl font-bold text-white text-center mb-4  capitalize lg:text-6xl">Viewing Articles about {term}</h1>
          <SearchForm searchText={(text) => setTerm(text)} />

        </div>
      </div>
      {isLoading ? (<h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1>) : (
        <section className="grid grid-cols-1 gap-10  px-5 pt-10 pb-20">
          {articles.map((article) => {
            const { abstract, headline: { main }, byline: { original },
              lead_paragraph, news_desk, section_name, web_url, _id,
              word_count } = article
            return (
              <article key={_id} className="bg-white py-10 px-5 rounded-lg 
      lg:w-9/12 lg:mx-auto">
                <h2 className="font-bold text-2xl mb-5 lg:text-4xl">{main}
                </h2>
                <p>{abstract}</p>
                <p>{lead_paragraph}</p>
                <ul className="my-4">
                  <li>{original}</li>
                  <li>
                    <span className="font-bold">News Desk:</span>
                    {news_desk}</li>
                  <li><span className="font-bold">Section Name:</span>{' '} {section_name}</li>
                  <li><span className="font-bold">Word Count: </span>
                    {word_count}</li>
                </ul>
                <a href={web_url} target="_blank" rel="noopener 
      noreferrer" alt="" className="underline">Web Resource</a>
              </article>
            )
          })}
        </section>)}
    </>
  );
}

export default App;
