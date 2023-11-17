import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./Register";
import Profile from "./Profile";
import NoPage from "./NoPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RegistrationForm />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
