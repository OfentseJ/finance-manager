import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import Login from "./component/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid mt-4">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <h2 className="text-center">Welcome to Finance Manager</h2>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
