import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Auth from "./pages/Auth";
import GetUsers from "./pages/GetUsers";
import DeleteUsers from "./pages/DeleteUsers";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/reg" element={ <Registration /> } />
        <Route path="/verify" element={ <Verify /> } />
        <Route path="/auth" element={ <Auth /> } />
        <Route path="/users" element={<GetUsers /> } />
        <Route path="/delete" element={<DeleteUsers /> } />
        <Route path="/profile" element={<Profile /> } />
      </Routes>
    </>
  );
};

export default App;