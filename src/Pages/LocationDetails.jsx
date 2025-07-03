import axios from 'axios';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

export default function LocationDetails() {
  const location = useLocation();
  const locationObj = location.state?.locationObj;
  const [residentsData, setResidentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(residentsData);

  useEffect(() => {
    async function fetchResidents() {
      setLoading(true);

      if (locationObj?.residents?.length) {
        try {
          const ids = locationObj.residents
            .map(url => url.split('/').pop())
            .join(',');
          const res = await axios.get(
            `https://rickandmortyapi.com/api/character/${ids}`
          );
          setResidentsData(Array.isArray(res.data) ? res.data : [res.data]);
        } catch (error) {
          console.error('Error fetching residents:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchResidents();
  }, [locationObj]);

  if (!locationObj) return <p>No location data found</p>;

  return (
    <>
      <div className="container pt-6 pb-20.5 md:pt-10.5 md:pb-9 cont-p-m">
        <NavLink to={'/locations'}>
          <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer mb-4">
            <svg className="size-6">
              <use href="./sprite.svg#icon-arrow-back"></use>
            </svg>
            <p>Go back</p>
          </div>
        </NavLink>
        <p>{locationObj.name}</p>
        <div className="flex justify-around">
          <p>{locationObj.type}</p>
          <p>{locationObj.dimension}</p>
        </div>
        <p>Residents</p>
        <ul className="flex flex-wrap justify-center gap-5 mb-12">
          {residentsData.length > 0 ? (
            residentsData.map(resident => (
              <li className="h-78 md:h-61 w-full md:w-60 rounded-sm shadow-card overflow-hidden">
                <img className="h-58 md:h-42 w-full" src={resident.image} />
                <div className="px-4 py-3">
                  <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
                    {resident.name}
                  </p>
                  <p className="text-sm leading-6 tracking-[.02em] text-gray3">
                    {resident.species}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>No residents found.</p>
          )}
        </ul>
      </div>
    </>
  );
}
