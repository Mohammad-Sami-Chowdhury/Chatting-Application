import "./App.css";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Home from "./pages/Home/Home"
import Sidebar from "./components/Sidebar/Sidebar";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import firebaseConfig from "./components/firebase/firebase.config";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/signup" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/reset" element={<PasswordReset />}></Route>
      <Route path="/sidebar" element={<Sidebar />}></Route>

    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
