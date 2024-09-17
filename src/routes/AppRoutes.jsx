import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Win from '../pages/Win';
import Lose from '../pages/Lose';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/win" element={<Win />} />
        <Route path="/lose" element={<Lose />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
