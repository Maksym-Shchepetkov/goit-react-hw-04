import { useEffect, useState } from 'react';
import { handleGetPhotos } from '../../services/api';
import axios from 'axios';
import s from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';

const App = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const handleFetchPhotos = async () => {
      try {
        const data = await handleGetPhotos();
        setPhotos(data);
      } catch (error) {
        console.log(alert(error));
      }
    };
    handleFetchPhotos();
  }, []);
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default App;
