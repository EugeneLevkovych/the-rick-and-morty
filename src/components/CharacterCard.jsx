import { NavLink } from 'react-router';

export default function CharacterCard({ character }) {
  return (
    <li className="h-78 md:h-61 w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer">
      <NavLink to={'/character-details'} state={{ character }}>
        <img className="h-58 md:h-42 w-full" src={character.image} />

        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {character.name}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {character.species}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
