
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // In production, this would be your backend URL
      const newSocket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3001', {
        auth: {
          token: localStorage.getItem('accessToken')
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('swap_request', (data) => {
        toast.info(`New swap request for ${data.itemName}`);
        setNotifications(prev => [...prev, data]);
      });

      newSocket.on('swap_accepted', (data) => {
        toast.success(`Your swap request was accepted!`);
        setNotifications(prev => [...prev, data]);
      });

      newSocket.on('swap_declined', (data) => {
        toast.error(`Your swap request was declined`);
        setNotifications(prev => [...prev, data]);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [user]);

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const value = {
    socket,
    notifications,
    markNotificationAsRead
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
