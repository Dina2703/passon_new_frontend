import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
