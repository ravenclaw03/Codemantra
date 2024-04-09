import React ,{useState} from 'react'
import ReactDOM from 'react-dom/client'
import CodeEditor from "./components/CodeEditor"
import Nav from "./components/Nav"
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx'
import Submissions from './components/Submissions.jsx'
export const AuthContext = React.createContext();

function Main() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<CodeEditor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <Main/>
  </React.StrictMode>
);
