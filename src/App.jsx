import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientPortal from './components/ClientPortal';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portal" element={<ClientPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
