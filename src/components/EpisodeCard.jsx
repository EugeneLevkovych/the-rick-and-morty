import { NavLink } from 'react-router';

export default function EpisodeCard({ episodeObj }) {
  return (
    <li className="flex justify-center items-center h-78 md:h-32 w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer">
      <NavLink to={'/location-details'} state={{ episodeObj }}>
        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {episodeObj.name}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {episodeObj.air_date}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
