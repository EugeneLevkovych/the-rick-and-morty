export default function LocationsCard({ locationObj }) {
  return (
    <li className="flex justify-center items-center h-78 md:h-32 w-full md:w-60 rounded-sm shadow-card overflow-hidden cursor-pointer">
      <div className="px-4 py-3">
        <p className="font-medium text-xl leading-6 tracking-[.01em] text-gray2">
          {locationObj.dimension}
        </p>
        <p className="text-sm leading-6 tracking-[.02em] text-gray3">
          {locationObj.type}
        </p>
      </div>
    </li>
  );
}
