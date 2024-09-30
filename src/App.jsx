import { Header } from './components';
import AppRoutes from './routes/AppRoutes';

function App() {
  const api = 'http://213.171.12.123:5000';
  
  return (
    <div className='wrapper'>
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
