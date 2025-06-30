import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem('favourites');
        if (storedFavourites) {
          setFavourites(JSON.parse(storedFavourites));
        }
      } catch (e) {
        console.error('Failed to load favourites.', e);
      }
    };
    loadFavourites();
  }, []);

  const saveFavourites = async (newFavourites) => {
    try {
      await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
      setFavourites(newFavourites);
    } catch (e) {
      console.error('Failed to save favourites.', e);
    }
  };

  const addFavourite = (recipe) => {
    const newFavourites = [...favourites, recipe];
    saveFavourites(newFavourites);
  };

  const removeFavourite = (id) => {
    const newFavourites = favourites.filter(r => r.idMeal !== id);
    saveFavourites(newFavourites);
  };

  const isFavourite = (id) => favourites.some(r => r.idMeal === id);

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}; 