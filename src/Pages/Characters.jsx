import { useEffect } from 'react';
import { useState } from 'react';
import logoBig from '../assets/images/logo-big.png';
import CharacterCard from '../components/CharacterCard';
import LoadMoreBtn from '../components/LoadMoreBtn';

export default function Characters() {
  const [query, setQuery] = useState(null);
  const [cartoonData, setCartoonData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=2&name=rick&status=alive`
      );
      const data = await res.json();
      // console.log(data);
      setCartoonData(data);
    }
    getData();
  }, [query]);
  console.log(cartoonData);
  return (
    <div className="container pt-6.5 pb-11 cont-p-m">
      <img className="mx-auto mb-4" src={logoBig} alt="Rick & Morty" />
      <div className="relative flex gap-5 mb-12">
        <svg className="size-6 absolute top-4 left-4 fill-gray1">
          <use href="/sprite.svg#icon-leading"></use>
        </svg>
        <input
          className="inp-border pl-12"
          type="text"
          placeholder="Filter by name..."
          onChange={e => setQuery(e.target.value)}
        />
        <select className="inp-border" name="species" id="species">
          <option value="human">Human</option>
          <option value="animal">Animal</option>
          <option value="robot">Robot</option>
        </select>
        <select className="inp-border" name="gender" id="gender">
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="genderless">genderless</option>
          <option value="unknown">unknown</option>
        </select>
        <select className="inp-border" name="status" id="status">
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>
      </div>
      <ul className="flex flex-wrap justify-center gap-5 mb-12">
        {cartoonData &&
          cartoonData.results.map(item => (
            <CharacterCard
              key={item.id}
              src={item.image}
              name={item.name}
              speacies={item.species}
            />
          ))}
      </ul>
      <LoadMoreBtn />
    </div>
  );
}
