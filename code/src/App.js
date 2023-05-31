import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import UploadPage from "./pages/UploadPage";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/index" element={<SuccessPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
