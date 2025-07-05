import axios from 'axios';
import { NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getEpisodeDetails } from '../data/episodeDetailsData.js';
import { API_URL } from '../data/api.js';
import CharacterCard from '../components/CharacterCard.jsx';

export default function EpisodeDetails() {
  const episode = useLocation();
  const episodeObj = episode.state?.episodeObj;
  const [charactersData, setCharactersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);

      if (!episodeObj?.characters?.length) {
        setLoading(false);
        return;
      }
      try {
        const ids = episodeObj.characters
          .map(url => url.split('/').pop())
          .join(',');
        const response = await axios.get(`${API_URL}/character/${ids}`);

        const data = await response.data;

        setCharactersData(
          Array.isArray(response.data) ? response.data : [response.data]
        );
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [episodeObj]);

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
          {episodeObj.name}
        </p>
        <ul className="flex justify-around mb-16">
          {getEpisodeDetails(episodeObj).map(([label, value]) => (
            <li key={label}>
              <p className="font-bold tracking-[0.01em] text-gray7">{label}:</p>
              <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                {value}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-medium text-xl leading-[1.2 tracking-[.01em]] text-gray5 mb-6">
          Cast
        </p>
        {loading ? (
          <p>Loading Residents...</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-5">
            {charactersData.map(item => (
              <CharacterCard key={item.id} characterObj={item} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
