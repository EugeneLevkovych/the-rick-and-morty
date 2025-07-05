import { NavLink } from 'react-router';

export default function CharacterCard({ characterObj }) {
  return (
    <li className="h-auto md:h-61 w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer">
      <NavLink to={'/character-details'} state={{ characterObj }}>
        <img className="h-auto md:h-42 w-full" src={characterObj.image} />
        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {characterObj.name}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {characterObj.species}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
