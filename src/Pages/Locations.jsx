import locationsImg from '../assets/images/locations.png';
import AdvFiltBtn from '../components/AdvFiltBtn';
import Input from '../components/Input';
import LoadMoreBtn from '../components/LoadMoreBtn';
import Select from '../components/Select';
import { TYPE, DIMENSION } from '../data/filtersData';
import { useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationsCard from '../components/LocationsCard';
import { API_URL } from '../data/api.js';
import { handleLoadMore } from '../functions/functions.js';

export default function Locations() {
  const [searchLocation, setSearchLocation] = useState('');
  const [locationData, setLocationData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { onClickAdvanced2Btn, type, setType, dimension, setDimension } =
    useOutletContext();

  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const response = await axios.get(`${API_URL}/location/`, {
          params: {
            page: pageNumber,
            name: searchLocation,
            dimension,
            type,
          },
        });
        const data = response.data;

        if (pageNumber === 1) {
          setLocationData(data);
        } else {
          setLocationData(prev => ({
            ...data,
            results: [...(prev?.results || []), ...data.results],
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchLocationsData();
  }, [searchLocation, type, dimension, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [dimension, type]);

  return (
    <div className="container pt-4 pb-6 cont-p-m">
      <p>Locations Page</p>
      <img
        className="w-54.5 md:w-81.5 mx-auto mb-6"
        src={locationsImg}
        alt="Rick & Morty"
      />
      <div className="md:flex md:gap-5 md:justify-center mb-4 md:mb-12">
        <Input
          search={searchLocation}
          setSearch={setSearchLocation}
          className="w-full md:w-81.5"
        />
        <Select
          onChange={e => setType(e.target.value)}
          value={type}
          name="type"
          className="hidden md:block w-60 xl:w-73 2xl:w-83"
        >
          {TYPE.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
        <Select
          onChange={e => setDimension(e.target.value)}
          value={dimension}
          name="dimension"
          className="hidden md:block w-60 xl:w-73 2xl:w-83"
        >
          {DIMENSION.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <AdvFiltBtn onClick={onClickAdvanced2Btn} />
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {locationData.results?.map(item => (
          <LocationsCard key={item.id} locationObj={item} />
        ))}
      </ul>
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
