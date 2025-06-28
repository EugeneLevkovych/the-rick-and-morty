export default function Select({ onChange, value, children, name }) {
  return (
    <select
      value={value}
      name={name}
      className="w-60 h-14 hidden md:block border rounded-lg border-gray1 p-4"
      onChange={onChange}
    >
      <option value="" disabled hidden>
        {name}
      </option>
      {children}
    </select>
  );
}
