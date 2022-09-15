import React from 'react';
import { AppInitial, Manager } from './services/appManager';
import { Shell } from './components/Shell';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
