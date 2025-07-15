import { NavLink } from 'react-router';

export default function Card({
  item,
  type,
  route,
  title,
  subtitle,
  image,
  height,
  centered,
}) {
  const cardConfig = {
    character: {
      stateKey: 'characterObj',
    },
    location: {
      stateKey: 'locationObj',
    },
    episode: {
      stateKey: 'episodeObj',
    },
    characterInLocation: {
      stateKey: 'characterObj',
    },
    characterInEpisode: {
      stateKey: 'characterObj',
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
      className={`${height} w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer ${centered}`}
    >
      <NavLink to={route} state={linkState}>
        {image && (
          <img className="h-auto md:h-42 w-full" src={image} alt={title} />
        )}
        <div className="px-4 py-3">
          <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
            {title}
          </p>
          <p className="text-sm leading-6 tracking-[.02em] text-gray3">
            {subtitle}
          </p>
        </div>
      </NavLink>
    </li>
  );
}
