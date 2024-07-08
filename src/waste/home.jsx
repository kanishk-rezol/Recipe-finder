// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-cover bg-center bg-fixed h-screen flex items-center justify-center'>
      <div className='text-center text-white'>
        <h1 className='text-5xl font-bold mb-8'>Welcome to Recipe Finder</h1>
        <p className='text-xl mb-12'>Find and explore delicious recipes from around the world.</p>
        <Link to='/recipe-finder' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
