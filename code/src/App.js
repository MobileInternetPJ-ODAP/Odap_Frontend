import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import UploadPage from "./pages/UploadPage";
import ManagePage from './pages/ManagePage';
import SamplePage from './pages/SamplePage';
import TagPage from './pages/TagPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/index" element={<SuccessPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/manage" element={<ManagePage/>} />
        <Route path="/manage/sample" element={<SamplePage />} />
        <Route path="/manage/sample/tag" element={<TagPage />} />
      </Routes>
    </Router>
  );
}
export default App;
