import locationsImg from '../assets/images/locations.png';
import Input from '../components/Input';
import LoadMoreBtn from '../components/LoadMoreBtn';
import Select from '../components/Select';
import { TYPE, DIMENSION } from '../data/filtersData';
import { useState } from 'react';

export default function Locations({ search, setSearch }) {
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  return (
    <div className="container pt-4 pb-6 cont-p-m">
      <p>Locations Page</p>
      <img className="mx-auto mb-6" src={locationsImg} alt="Rick & Morty" />
      <div className="flex gap-5 mb-4 md:mb-12">
        <Input />
        <Select
          onChange={e => setType(e.target.value)}
          value={type}
          name="Species"
          className="hidden md:block w-60 xl:w-73"
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
          name="Gender"
          className="hidden md:block w-60 xl:w-73"
        >
          {DIMENSION.map(i => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Select>
      </div>
      <LoadMoreBtn />
    </div>
  );
}
