import React from 'react';
import { AppInitial, Manager } from './services/appManager';
import { Shell } from './components/Shell';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => <div><img alt="Login Page" /></div>
export const Home = () => <div><img alt="Home Page" /></div>
export const NoMatch = () => <div>No match</div>

interface Props {
  manager: Manager;
}
const App = ({ manager }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const callback = () => {
      navigate('/login');
      manager.tokenHandler.setTokenToStorage(undefined);
    }
    manager.eventBus.on('logout', callback)

    if (manager.tokenHandler.isTokenExpired()) {
      manager.eventBus.emit('logout');
    };
    return () => {
      manager.eventBus.removeListener('logout', callback);
    }
  }, []);

  return (
    <div>
      <Shell />
    </div>
  );
}

export default App;
