import axios from 'axios';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getLocationDetails } from '../data/locationDetailData';
import { API_URL } from '../data/api.js';

export default function LocationDetails() {
  const location = useLocation();
  const locationObj = location.state?.locationObj;
  const [residentsData, setResidentsData] = useState([]);
  const [loadingResidents, setLoadingResidents] = useState(true);

  useEffect(() => {
    async function fetchResidents() {
      setLoadingResidents(true);

      if (locationObj?.residents?.length) {
        try {
          const ids = locationObj.residents
            .map(url => url.split('/').pop())
            .join(',');
          const res = await axios.get(`${API_URL}/character/${ids}`);
          setResidentsData(Array.isArray(res.data) ? res.data : [res.data]);
        } catch (error) {
          console.error('Error fetching residents:', error);
        } finally {
          setLoadingResidents(false);
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
        <p className="text-4xl text-center text-gray7 mb-6">
          {locationObj.name}
        </p>
        <ul className="flex justify-around mb-16">
          {getLocationDetails(locationObj).map(([label, value]) => (
            <li key={label}>
              <p className="font-bold tracking-[0.01em] text-gray7">{label}:</p>
              <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                {value}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-medium text-xl leading-[1.2 tracking-[.01em]] text-gray5 mb-6">
          Residents
        </p>
        {loadingResidents ? (
          <p>Loading Residents...</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5">
            {residentsData.map(resident => (
              <li
                className="h-78 md:h-61 w-full md:w-60 rounded-sm shadow-card overflow-hidden"
                key={resident.id}
              >
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
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
