import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Characters from './Pages/Characters';
import Episodes from './Pages/Episodes';
import Locations from './Pages/Locations';
import CharacterDetails from './Pages/CharacterDetails';
import LocationDetails from './Pages/LocationDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Characters /> },
      { path: 'locations', element: <Locations /> },
      { path: 'episodes', element: <Episodes /> },
      { path: 'character-details', element: <CharacterDetails /> },
      { path: 'location-details', element: <LocationDetails /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
