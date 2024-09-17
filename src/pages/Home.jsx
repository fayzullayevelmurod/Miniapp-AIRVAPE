import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { getUser } from '../api/userService';

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser(data);
    };

    fetchUser();
  }, [setUser]);

  return <div className='home-page'></div>;
};

export default Home;
