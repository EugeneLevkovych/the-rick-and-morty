export default function CharacterCard({ src, name, speacies }) {
  return (
    <li className="rounded-sm overflow-hidden">
      <img src={src} />
      <p>{name}</p>
      <p>{speacies}</p>
    </li>
  );
}
