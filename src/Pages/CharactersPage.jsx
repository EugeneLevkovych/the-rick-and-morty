import { useEffect, useState } from 'react';
import axios from 'axios';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard.jsx';
import LoadMoreBtn from '../components/LoadMoreBtn.jsx';
import { SPECIES, GENDER, STATUS } from '../data/filtersData.js';
import Select from '../components/Select.jsx';
import Input from '../components/Input.jsx';
import AdvFiltBtn from '../components/AdvFiltBtn.jsx';
import { API_URL } from '../data/api.js';
import { handleLoadMore } from '../utils/index.js';
import FiltersOverlay from '../components/FiltersOverlay.jsx';
import Card from '../components/Card.jsx';

export default function CharactersPage() {
  const [search, setSearch] = useState('');
  const [charactersData, setCharactersData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/character`, {
          params: {
            page: pageNumber,
            name: search,
            species,
            gender,
            status,
          },
        });
        const data = response.data;
        setError(null);

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
        setError('Failed to load characters. Please try again later.');
      }
    }

    getData();
  }, [search, species, gender, status, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [species, gender, status]);

  return (
    <div className="container pt-23 md:pt-21.5 pb-4 md:pb-11 container-padding-margin">
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
      <AdvFiltBtn onClick={() => setIsOverlayOpen(true)} />

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-5 mb-12">
          {charactersData &&
            charactersData.results.map(item => (
              <Card key={item.id} item={item} type="character" />
              // <CharacterCard key={item.id} characterObj={item} />
            ))}
        </ul>
      )}
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
      {isOverlayOpen && (
        <FiltersOverlay
          isOpen={isOverlayOpen}
          onClickClose={() => setIsOverlayOpen(false)}
          species={species}
          setSpecies={setSpecies}
          gender={gender}
          setGender={setGender}
          status={status}
          setStatus={setStatus}
        >
          <Select
            onChange={e => setSpecies(e.target.value)}
            value={species}
            name="Species"
            className="w-full"
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
            className="w-full"
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
            className="w-full"
          >
            {STATUS.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </FiltersOverlay>
      )}
    </div>
  );
}
