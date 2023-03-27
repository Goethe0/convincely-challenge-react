import {useEffect, useState} from "react";
import { ChangeEvent } from "react";
import './index.scss';

import {getMovies, MovieData} from '../api';
import MovieCard from "../MovieCard";

let allItems = [];

const MovieList = () => {
  const [items, setItems] = useState([]);
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onInput', e)
  };

  const sortFilters = [
    {
      name: 'Budget',
      value: 'budgetInMillions'
    },
    {
      name: 'Runtime',
      value: 'runtimeInMinutes'
    },
    {
      name: 'Title',
      value: 'name'
    },
  ];

  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('onSelect',  e)
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getMovies();
    if (response?.docs) {
      console.log('response_index', response.docs);
      allItems = response.docs;
      setItems(response.docs);
    }
  }

  const handleSearchInput = e => {
    const searchText = e.target.value.toLowerCase();
    console.log(searchText);
    // if (searchText.length === 0) {
    //   setItems(allItems);
    // }
    if (searchText.length > 2) {
      const newItems = allItems.filter(item => item.name.toLowerCase().includes(searchText));
      setItems(newItems);
    }

  }

  const handleSortSelect = e => {
    const value = e.target.value;
    console.log('handleSortSelect', value);
    setItems([]);
    const newItems = allItems.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0));
    // console.log('sort', allItems.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0)));
    // console.log('sort', allItems);
    console.log('sort', newItems);
    // setItems(currItems => currItems.sort((a,b) => (a[value] > b[value]) ? 1 : ((b[value] > a[value]) ? -1 : 0)));
    setTimeout(() => setItems(newItems), 100);

  }

	return (
		<div className="movieList">
      <header className="movieList__header">
        <h1>Lord of the Rings Movies</h1>
        <div className="movieList__header__metrics">
          <div>Avg. movie runtime: xxx min</div>
          <div>Avg. movie budget: $xx M</div>
        </div>
        <input
          className="movieList__header__filter"
          placeholder="Filter movies by name"
          onChange={handleSearchInput}
        />
        <select
          className="movieList__header__sort"
          placeholder="Filter movies by name"
          onChange={handleSortSelect}
        >
          {sortFilters.map(item => (
            <option key={item.value} value={item.value}>{item.name}</option>
          ))}
        </select>
      </header>
      <main className="movieList__items movies-wrapper">
        {items.map(item => (
          <MovieCard data={item} key={item._id} />
        ))}
      </main>
    </div>
	);
}

export default MovieList
