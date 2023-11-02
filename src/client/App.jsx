import './assets/style.scss';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import MainContainer from './containers/MainContainer';
import { appointmentsLoader } from './context/loaders';
// export default function App() {
//   return (
//     <>
//       <MainContainer />
//     </>
//   );
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<MainContainer />}
      loader={appointmentsLoader}
      id='home'
      // errorElement={<ErrorElement />}
    ></Route>,
  ),
);

export default function App ()  {
  return <RouterProvider router={router} />;
};
