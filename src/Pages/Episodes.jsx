import episodesImg from '../assets/images/episodes.png';
import Input from '../components/Input';
import LoadMoreBtn from '../components/LoadMoreBtn';

export default function Episodes() {
  return (
    <div className="container pt-4 pb-6 cont-p-m">
      <p>Episodes Page</p>
      <img
        className="w-43.5 md:w-67.5 mx-auto mb-6"
        src={episodesImg}
        alt="Rick & Morty"
      />
      <div className="md:flex md:justify-center mb-12 md:mb-16">
        <Input className="w-full md:w-125" />
      </div>
      <LoadMoreBtn />
    </div>
  );
}
