import { useEffect } from 'react';
import { useState } from 'react';
import logoBig from '../assets/images/logo-big.png';

export default function Characters() {
  const [query, setQuery] = useState(null);
  const [cartoonData, setCartoonData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://rickandmortyapi.com/api/character`);
      const data = await res.json();
      // console.log(data);
      setCartoonData(data);
    }
    getData();
  }, [query]);
  console.log(cartoonData);
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
        <select className="inp-border" name="gender" id="gender"></select>
        <select className="inp-border" name="status" id="status"></select>
      </div>
      <div>
        {cartoonData &&
          cartoonData.results.map(item => (
            <li key={item.id}>
              <img src={item.image} />
              <p>{item.name}</p>
            </li>
          ))}
      </div>
    </div>
  );
}
