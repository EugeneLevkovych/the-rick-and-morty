import axios from 'axios';
import episodesImg from '../assets/images/episodes.png';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { API_URL } from '../data/api.js';
import { handleLoadMore } from '../functions/functions.js';
import EpisodeCard from '../components/EpisodeCard.jsx';

export default function Episodes() {
  const [searchEpisodes, setSearchEpisodes] = useState('');
  const [episodesData, setEpisodesData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${API_URL}/episode`, {
          params: {
            page: pageNumber,
            name: searchEpisodes,
          },
        });
        const data = response.data;

        if (pageNumber === 1) {
          setEpisodesData(data);
        } else {
          setEpisodesData(prev => ({
            ...data,
            results: [...(prev?.results || []), ...data.results],
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [searchEpisodes, pageNumber]);

  return (
    <div className="container pt-19 pb-6 container-padding-margin">
      <p>Episodes Page</p>
      <img
        className="w-43.5 md:w-67.5 mx-auto mb-6"
        src={episodesImg}
        alt="Rick & Morty"
      />
      <div className="md:flex md:justify-center mb-12 md:mb-16">
        <Input
          search={searchEpisodes}
          setSearch={setSearchEpisodes}
          className="w-full md:w-125"
        />
      </div>
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {episodesData &&
          episodesData.results.map(item => (
            <EpisodeCard key={item.name} episodeObj={item} />
          ))}
      </ul>
      <LoadMoreBtn onClick={() => handleLoadMore(setPageNumber)} />
    </div>
  );
}
