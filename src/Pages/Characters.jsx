import { useEffect } from 'react';
import { useState } from 'react';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { SPECIES, GENDER, STATUS } from '../data/filtersData';
import Select from '../components/Select';

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
    <div className="container pt-8 md:pt-6.5 pb-4 md:pb-11 cont-p-m">
      <img className="mx-auto mb-8 md:mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="relative flex gap-5 mb-4 md:mb-12">
        <svg className="size-6 absolute top-4 left-4 fill-gray1">
          <use href="/sprite.svg#icon-leading"></use>
        </svg>
        <input
          value={search}
          className="w-full md:max-w-60 border rounded-lg border-gray1 py-4 pl-12"
          type="text"
          placeholder="Filter by name..."
          onChange={e => setSearch(e.target.value)}
          name="search"
        />
        <Select
          onChange={e => setSpecies(e.target.value)}
          value={species}
          name="Species"
        >
          {SPECIES.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
        <Select
          onChange={e => setGender(e.target.value)}
          value={gender}
          name="Gender"
        >
          {GENDER.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
        <Select
          onChange={e => setStatus(e.target.value)}
          value={status}
          name="Status"
        >
          {STATUS.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <div className="relative md:hidden items-center bg-blue2 shadow-adv-filters-btn rounded-lg p-4 mb-12">
        <svg className="absolute top-4 left-6 size-5 fill-gray4">
          <use href="./sprite.svg#icon-burger2"></use>
        </svg>
        <p className="text-center text-blue1">Advanced Filters</p>
      </div>
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {cartoonData &&
          cartoonData.results.map(item => (
            <CharacterCard
              key={item.id}
              src={item.image}
              name={item.name}
              species={item.species}
              character={item}
            />
          ))}
      </ul>
      <LoadMoreBtn onClick={handleLoadMore} />
    </div>
  );
}
