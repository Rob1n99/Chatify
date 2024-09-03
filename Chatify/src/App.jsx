import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
