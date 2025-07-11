import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
// import ErrorPage from './pages/ErrorPage';
import CharacterDetailsPage from './ages/CharacterDetailsPage';
import CharactersPage from './ages/CharactersPage';
import EpisodeDetailsPage from './ages/EpisodeDetailsPage';
import EpisodesPage from './ages/EpisodesPage';
import LocationDetailsPage from './ages/LocationDetailsPage';
import LocationsPage from './ages/LocationsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <CharactersPage /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'episodes', element: <EpisodesPage /> },
      { path: 'character-details', element: <CharacterDetailsPage /> },
      { path: 'location-details', element: <LocationDetailsPage /> },
      { path: 'episode-details', element: <EpisodeDetailsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
