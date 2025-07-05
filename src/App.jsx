import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Characters from './Pages/Characters';
import Episodes from './Pages/Episodes';
import Locations from './Pages/Locations';
import CharacterDetails from './Pages/CharacterDetails';
import LocationDetails from './Pages/LocationDetails';
import EpisodeDetails from './Pages/EpisodeDetails';
import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Characters /> },
      { path: 'locations', element: <Locations /> },
      { path: 'episodes', element: <Episodes /> },
      { path: 'character-details', element: <CharacterDetails /> },
      { path: 'location-details', element: <LocationDetails /> },
      { path: 'episode-details', element: <EpisodeDetails /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
