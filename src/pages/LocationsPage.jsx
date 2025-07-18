import locationsImg from '../assets/images/locations.png';
import Input from '../components/Input.jsx';
import LoadMoreBtn from '../components/LoadMoreBtn.jsx';
import Select from '../components/Select.jsx';
import { getLocationsFilters } from '../data/filtersData.js';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../data/api.js';
import { handleLoadMore } from '../utils/index.js';
import FiltersOverlay from '../components/FiltersOverlay.jsx';
import Card from '../components/Card.jsx';

export default function LocationsPage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [locationData, setLocationData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  const selectFilters = getLocationsFilters({
    type,
    setType,
    dimension,
    setDimension,
  });

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/location`, {
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

    getData();
  }, [searchLocation, type, dimension, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [dimension, type]);

  const filters = useMemo(() => {
    return selectFilters.map(({ name, value, onChange, options }) => (
      <Select
        key={name}
        onChange={e => onChange(e.target.value)}
        value={value}
        name={name}
        className="w-full md:w-60 xl:w-73 2xl:w-83"
        options={options}
      />
    ));
  }, [selectFilters]);

  return (
    <div className="container pt-25 pb-6 container-centered">
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
        <div className="hidden md:flex gap-5"> {filters}</div>
      </div>

      <FiltersOverlay>{filters}</FiltersOverlay>

      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {locationData.results?.map(item => (
          <Card
            key={item.id}
            item={item}
            stateKey="locationObj"
            route="/location-details"
            title={item.dimension}
            subtitle={item.type}
            height="h-78 md:h-32"
            centered="flex justify-center items-center"
          />
        ))}
      </ul>
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
