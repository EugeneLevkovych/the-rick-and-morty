import { NavLink, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { getCharacterDetails } from '../data/characterDetailsData';

export default function CharacterDetails() {
  const location = useLocation();
  const character = location.state?.character;
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!character?.episode) return;

      try {
        setLoadingEpisodes(true);

        // Отримуємо ID епізодів з URL
        const episodeIds = character.episode.map(url => {
          const parts = url.split('/');
          return parts[parts.length - 1];
        });

        // Робимо запит для всіх епізодів одразу
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`
        );
        const data = await response.json();

        // Якщо один епізод, API повертає об'єкт, якщо кілька - масив
        const episodesData = Array.isArray(data) ? data : [data];
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error fetching episodes:', error);
        setEpisodes([]);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [character]);

  return (
    <div className="container pt-6 pb-20.5 md:pt-10.5 md:pb-9 cont-p-m">
      <NavLink to={'/'}>
        <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer mb-4">
          <svg className="size-6">
            <use href="./sprite.svg#icon-arrow-back"></use>
          </svg>
          <p>Go back</p>
        </div>
      </NavLink>
      <img
        className="size-37 border-0 rounded-full mx-auto md:-mt-18 mb-4"
        src={character.image}
      />
      <p className="text-[2rem] text-center text-gray7 pb-4">
        {character.name}
      </p>
      <div className="flex flex-col md:flex-row gap-13 md:gap-5">
        <div className="max-w-103 w-full">
          <p className="font-medium text-xl leading-tight tracking-[.01em] text-gray5 mb-4">
            Informations
          </p>
          <ul>
            {getCharacterDetails(character).map(([label, value]) => (
              <li
                key={label}
                className="w-full border-b border-gray6 pt-2 pb-3 px-4"
              >
                <p className="font-bold tracking-[0.01em] text-gray7">
                  {label}:
                </p>
                <p className="text-sm leading-[1.42] tracking-[.02em] text-gray8">
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-xl leading-tight tracking-[.01em] text-gray5 mb-4">
            Episodes
          </p>
          {loadingEpisodes ? (
            <p>Loading episodes...</p>
          ) : (
            <ul>
              {episodes.map(episode => (
                <li
                  key={episode.id}
                  className="relative w-full border-b border-gray6 pt-[10px] pb-4 px-4"
                >
                  <p className="font-medium">{episode.name}</p>
                  <p className="text-sm text-gray-600">{episode.episode}</p>
                  <p>{episode.air_date}</p>
                  <svg className="absolute size-4 top-9.5 right-9.5 fill-gray5">
                    <use href="./sprite.svg#icon-arrow1"></use>
                  </svg>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
