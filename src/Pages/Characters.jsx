import { useEffect } from 'react';
import logoBig from '../assets/images/logo-big.png';

export default function Characters() {
  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://rickandmortyapi.com/api/character`);
      const data = await res.json();
      console.log(data);
    }
    getData();
  }, []);

  return (
    <div className="container cont-p-m">
      <img src={logoBig} alt="Rick & Morty" />
      <div className="relative flex">
        <svg className="size-6 absolute top-4 left-4 fill-gray1">
          <use href="/sprite.svg#icon-leading"></use>
        </svg>
        <input
          className="inp-border pl-12"
          type="text"
          placeholder="Filter by name..."
          onChange={e => setQuery(e.target.value)}
        />
        <select className="inp-border" name="species" id="species"></select>
      </div>
    </div>
  );
}
