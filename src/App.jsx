// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from "./component/ContactForm.jsx";
import SecondPage from "./component/SecondPage.jsx";
import ThirdPage from "./component/ThirdPage.jsx";
import NotFound from "./component/NotFound.jsx";

// import ProtectedRoute from "./Routes/ProtectedRoute.jsx"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/" element={<ContactForm />} />
        <Route exact path="/second-page" element={<SecondPage />} />
        <Route exact path="/Third-page" element={<ThirdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
