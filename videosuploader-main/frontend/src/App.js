import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './login';
import Signup from './signup';
import Home from "./home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
