export default function CharacterCard({ src, name, speacies }) {
  return (
    <li className="h-78 md:h-61 w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer">
      <img className="h-58 md:h-42 w-full" src={src} />

      <div className="px-4 py-3">
        <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
          {name}
        </p>
        <p className="text-sm leading-6 tracking-[.02em] text-gray3">
          {speacies}
        </p>
      </div>
    </li>
  );
}
