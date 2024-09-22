import { Header } from './components';
import Home from './pages/Home';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      {/* <Home /> */}
      <AppRoutes />
    </div>
  );
}

export default App;
