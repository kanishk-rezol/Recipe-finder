import React, { useState } from 'react';
import axios from 'axios';
import './RecipeFinder.css';

const RecipeFinder = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [emptyQueryError, setEmptyQueryError] = useState(false);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const APP_ID = '60983764';
      const APP_KEY = '9b0f31d8daba09a694cb2c1907ff61f9';
      const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      setRecipes(response.data.hits);
      setSearched(true);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      setEmptyQueryError(true);
    } else {
      setEmptyQueryError(false);
      fetchRecipes();
    }
  };

  const handleNewSearch = () => {
    setQuery('');
    setRecipes([]);
    setSearched(false);
  };

  return (
    <div>
      <style>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translate(-40%, -50%);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
          }
        }
        //   body{
        //   background-image: url('./a755am1xd.png');
        //   }
        .recipe-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 50px;
          margin-top: 20px;
        //   background: transparent;
        }
        .recipe-card {
          display: flex;
          background: transparent;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
          width: 400px;
          height: 490px;
          text-align: center;
          animation: slideIn 0.5s ease-in-out;
          background:white;
        //   background: transparent;
        }
        .recipe-card img {
        //   width: 100%;
          max-height: 300px;
          border-radius: 8px;
          margin-top: 10px;
          object-fit: cover;
        }
        .recipe-card h2 {
          font-size: 1.5rem;
          margin-top: 10px;
        }
        .recipe-card p {
          margin-top: 8px;
        }
        .recipe-card a {
          color: #007bff;
          text-decoration: none;
          margin-top: 8px;
          display: inline-block;
        }
      `}</style>
      
      {!searched && (
        <div className='custom-background'>
          <h1 className='text-[40px] font-thin font-serif mt-[00px] bg-transparent h-[80px] rounded-[50px] shadow-lg '>Recipe Finder</h1>
          <form className='mt-[340px]' onSubmit={handleSearch}>
            <input
              className='border-2 border-[#353434] rounded-[50px] h-10 mx-auto w-80'
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes"
            />
            <button type="submit" className='ml-[20px] mx-auto bg-slate-300 rounded-[50px] h-10 w-28'>Search</button>
          </form>
          {emptyQueryError && <p>Please enter something in the search box.</p>}
        </div>
      )}

      {loading && <p >Loading...</p>}
      {error && <p>{error}</p>}

      {searched && (
        <div className="custom-background2 bg-trasnparent">
          <h1 className='text-[40px] font-thin mt-[00px]  h-[80px] rounded-[50px] shadow-lg'>Recipe Finder</h1>
          <button className='bg-slate-300 rounded-[50px] mt-6 h-10 w-28 mx-auto' onClick={handleNewSearch}>New Search</button>
          <div className='recipe-container'>
            {recipes.map(({ recipe }) => (
              <div key={recipe.uri} className='recipe-card bg-transparent'>
                <h2>{recipe.label}</h2>
                <img src={recipe.image} alt={recipe.label} />
                <p>Calories: {recipe.calories.toFixed(2)}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;
