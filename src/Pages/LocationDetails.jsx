import axios from 'axios';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getLocationDetails } from '../data/locationDetailData';
import { API_URL } from '../data/api.js';
import CharacterCard from '../components/CharacterCard.jsx';

export default function LocationDetails() {
  const location = useLocation();
  const locationObj = location.state?.locationObj;
  const [residentsData, setResidentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResidents() {
      setLoading(true);

      if (!locationObj?.residents?.length) {
        setLoading(false);
        return;
      }
      try {
        const ids = locationObj.residents
          .map(url => url.split('/').pop())
          .join(',');
        const response = await axios.get(`${API_URL}/character/${ids}`);

        const data = response.data;

        setResidentsData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setResidentsData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResidents();
  }, [locationObj]);

  return (
    <>
      <div className="container pt-21 pb-20.5 md:pt-22.5 md:pb-9 container-padding-margin">
        <div className="flex flex-col md:flex-row md:gap-40 lg:gap-70 xl:gap-100 md:items-center md:mb-6">
          <NavLink to={'/locations'}>
            <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer">
              <svg className="size-6">
                <use href="./sprite.svg#icon-arrow-back"></use>
              </svg>
              <p>Go back</p>
            </div>
          </NavLink>
          <p className="text-4xl text-center text-gray7">{locationObj.name}</p>
        </div>
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
        {loading ? (
          <p>Loading Residents...</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5">
            {residentsData.map(item => (
              <CharacterCard key={item.id} characterObj={item} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
