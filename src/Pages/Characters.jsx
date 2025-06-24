import logoBig from '../assets/images/logo-big.png';

export default function Characters() {
  return (
    <div className="container cont-p-m">
      <img src={logoBig} alt="Rick & Morty" />
      <div className="flex">
        <input type="text" placeholder="Filter by name..." />
        <select name="species" id="species"></select>
      </div>
    </div>
  );
}
