import episodesImg from '../assets/images/episodes.png';
import Input from '../components/Input';
import LoadMoreBtn from '../components/LoadMoreBtn';

export default function Episodes() {
  return (
    <div className="container pt-4 pb-6 cont-p-m">
      <p>Episodes Page</p>
      <img className="mx-auto mb-6" src={episodesImg} alt="Rick & Morty" />

      <Input />
      <LoadMoreBtn />
    </div>
  );
}
