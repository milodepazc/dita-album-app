import React from 'react';
import AlbumList from './pages/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="mt-4 mb-4">DITA</h1>
      <AlbumList />
    </div>
  );
};

export default App;
