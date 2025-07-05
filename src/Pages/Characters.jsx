import { useEffect, useState } from 'react';
import axios from 'axios';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { SPECIES, GENDER, STATUS } from '../data/filtersData';
import Select from '../components/Select';
import { useOutletContext } from 'react-router';
import Input from '../components/Input';
import AdvFiltBtn from '../components/AdvFiltBtn';
import { API_URL } from '../data/api.js';
import { handleLoadMore } from '../functions/functions.js';

export default function Characters() {
  const [charactersData, setCharactersData] = useState(null);
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
          setCharactersData(data);
        } else {
          setCharactersData(prev => ({
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

  return (
    <div className="container pt-8 md:pt-6.5 pb-4 md:pb-11 cont-p-m">
      <img className="mx-auto mb-8 md:mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="md:flex gap-5 justify-center mb-4 md:mb-12">
        <Input
          search={search}
          setSearch={setSearch}
          className="w-full md:w-60"
        />
        <Select
          onChange={e => setSpecies(e.target.value)}
          value={species}
          name="Species"
          className="hidden md:block w-60"
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
          className="hidden md:block w-60"
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
          className="hidden md:block w-60"
        >
          {STATUS.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <AdvFiltBtn onClick={onClickAdvancedBtn} />
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {charactersData &&
          charactersData.results.map(item => (
            <CharacterCard key={item.id} characterObj={item} />
          ))}
      </ul>
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
