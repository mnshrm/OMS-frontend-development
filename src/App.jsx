import Root from "./scenes/RootLayout/Root";
import Error from "./scenes/ErrorPage/Error";
import Profile from "./scenes/Profile/Profile";
import Events, {
  loader as eventsLoader,
  action as createEventAction,
} from "./scenes/Events/Events";
import Event, {
  loader as eventLoader,
  action as attendanceAction,
} from "./scenes/Events/Event";
import CadetInfo, { loader as cadetLoader } from "./scenes/CadetInfo/CadetInfo";
import Dashboard from "./scenes/Dashboard/Dashboard";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./scenes/Authentication/Login";

import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import AuthError from "./scenes/Authentication/Error";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
    errorElement: <AuthError />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      // {
      //   index: true,
      //   element: <Dashboard />,
      // },
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "events",
        element: <Events />,
        loader: eventsLoader,
        action: createEventAction,
      },
      {
        path: "event/:id",
        element: <Event />,
        loader: eventLoader,
        action: attendanceAction,
      },
      {
        path: "cadetInfo",
        element: <CadetInfo />,
        loader: cadetLoader,
      },
    ],
  },
]);

function App() {
  return (
    <div className="main">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
