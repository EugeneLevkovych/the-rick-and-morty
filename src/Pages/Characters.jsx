import { useEffect, useState } from 'react';
import axios from 'axios';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { SPECIES, GENDER, STATUS } from '../data/filtersData';
import Select from '../components/Select';
import { useOutletContext } from 'react-router';
import Input from '../components/Input';

const API_URL = 'https://rickandmortyapi.com/api';

export default function Characters() {
  const [cartoonData, setCartoonData] = useState(null);
  const [search, setSearch] = useState('');

  const [pageNumber, setPageNumber] = useState(1);
  const {
    onClickAdvancedBtn,
    species,
    setSpecies,
    gender,
    setGender,
    status,
    setStatus,
  } = useOutletContext();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/character/`, {
          params: {
            page: pageNumber,
            name: search,
            species,
            gender,
            status,
          },
        });
        const data = response.data;
        if (pageNumber === 1) {
          setCartoonData(data);
        } else {
          setCartoonData(prev => ({
            ...data,
            results: [...(prev?.results || []), ...data.results],
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, [search, species, gender, status, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [species, gender, status]);

  console.log(cartoonData);

  function handleLoadMore() {
    setPageNumber(prev => prev + 1);
  }

  return (
    <div className="container pt-8 md:pt-6.5 pb-4 md:pb-11 cont-p-m">
      <img className="mx-auto mb-8 md:mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="flex gap-5 mb-4 md:mb-12">
        <Input search={search} setSearch={setSearch} />
        <Select
          onChange={e => setSpecies(e.target.value)}
          value={species}
          name="Species"
          className="hidden md:block w-60 xl:w-73"
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
          className="hidden md:block w-60 xl:w-73"
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
          className="hidden md:block w-60 xl:w-73"
        >
          {STATUS.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <div
        onClick={onClickAdvancedBtn}
        className="relative md:hidden items-center bg-blue2 shadow-adv-filters-btn rounded-lg p-4 mb-12"
      >
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
