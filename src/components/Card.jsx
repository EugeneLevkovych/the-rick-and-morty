import { NavLink } from 'react-router';

export default function Card({ item, type, route }) {
  const cardConfig = {
    character: {
      stateKey: 'characterObj',
      hasImage: true,
      height: 'h-auto md:h-61',
      title: item.name,
      subtitle: item.species,
      image: item.image,
    },
    location: {
      stateKey: 'locationObj',
      hasImage: false,
      height: 'h-78 md:h-32',
      title: item.dimension,
      subtitle: item.type,
      centered: true,
    },
    episode: {
      stateKey: 'episodeObj',
      hasImage: false,
      height: 'h-78 md:h-32',
      title: item.name,
      subtitle: item.air_date,
      centered: true,
    },
    characterInLocation: {
      stateKey: 'characterObj',
      hasImage: true,
      height: 'h-auto md:h-61',
      title: item.name,
      subtitle: item.species,
      image: item.image,
    },
    characterInEpisode: {
      stateKey: 'characterObj',
      hasImage: true,
      height: 'h-auto md:h-61',
      title: item.name,
      subtitle: item.species,
      image: item.image,
    },
  };

  const config = cardConfig[type];

  if (!config) {
    console.error(`Unknown card type: ${type}`);
    return null;
  }

  const linkState = { [config.stateKey]: item };

  return (
    <li
      className={`${config.height} w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer ${config.centered ? 'flex justify-center items-center' : ''}`}
    >
      <NavLink to={route} state={linkState}>
        {config.hasImage && (
          <img
            className="h-auto md:h-42 w-full"
            src={config.image}
            alt={config.title}
          />
        )}
        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {config.title}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {config.subtitle}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
