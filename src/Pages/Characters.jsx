import { useEffect } from 'react';
import { useState } from 'react';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard';
import LoadMoreBtn from '../components/LoadMoreBtn';

const API_URL = 'https://rickandmortyapi.com/api';

export default function Characters() {
  const [cartoonData, setCartoonData] = useState(null);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `${API_URL}/character/?page=${pageNumber}&name=${search}&species=${species}&gender=${gender}&status=${status}`
      );
      const data = await res.json();
      // console.log(data);
      setCartoonData(data);
    }
    getData();
  }, [search, search, species, gender, status]);

  console.log(cartoonData);

  async function handleLoadMore() {
    const res = await fetch(
      `${API_URL}/character/?page=${pageNumber}&name=${search}&species=${species}&gender=${gender}&status=${status}`
    );
    const data = await res.json();
    setCartoonData(data);
    setPageNumber(x => x + 1);
    console.log(data.results);
  }

  return (
    <div className="container pt-6.5 pb-11 cont-p-m">
      <img className="mx-auto mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="relative flex gap-5 mb-12">
        <svg className="size-6 absolute top-4 left-4 fill-gray1">
          <use href="/sprite.svg#icon-leading"></use>
        </svg>
        <input
          value={search}
          className="inp-border pl-12"
          type="text"
          placeholder="Filter by name..."
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={species}
          className="inp-border"
          name="species"
          id="species"
          onChange={e => setSpecies(e.target.value)}
        >
          <option value="human">Human</option>
          <option value="animal">Animal</option>
          <option value="robot">Robot</option>
          <option value="alien">Alien</option>
        </select>
        <select
          value={gender}
          className="inp-border"
          name="gender"
          id="gender"
          onChange={e => setGender(e.target.value)}
        >
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="genderless">genderless</option>
          <option value="unknown">unknown</option>
        </select>
        <select
          value={status}
          className="inp-border"
          name="status"
          id="status"
          onChange={e => setStatus(e.target.value)}
        >
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {cartoonData &&
          cartoonData.results.map(item => (
            <CharacterCard
              key={item.id}
              src={item.image}
              name={item.name}
              speacies={item.species}
            />
          ))}
      </ul>
      <LoadMoreBtn onClick={handleLoadMore} />
    </div>
  );
}
