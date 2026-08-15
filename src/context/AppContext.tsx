import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Store, ToastMessage, NotificationItem } from '../types';
import { currentUser as defaultUser, initialStores, initialNotifications } from '../data/mockData';

interface AppContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  stores: Store[];
  currentStore: Store;
  setCurrentStore: (store: Store) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  notificationsPanelOpen: boolean;
  setNotificationsPanelOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('omni_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [stores, setStores] = useState<Store[]>(initialStores);
  const [currentStore, setCurrentStoreState] = useState<Store>(() => {
    const saved = localStorage.getItem('omni_current_store');
    return saved ? JSON.parse(saved) : initialStores[0];
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('omni_auth') !== 'false';
  });

  // Persist user and store
  useEffect(() => {
    localStorage.setItem('omni_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('omni_current_store', JSON.stringify(currentStore));
  }, [currentStore]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setCurrentStore = (store: Store) => {
    setCurrentStoreState(store);
    showToast({
      type: 'info',
      title: 'Store Context Switched',
      message: `Active workspace switched to "${store.name}".`,
    });
  };

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast({
      type: 'success',
      title: 'Notifications Cleared',
      message: 'All notifications have been marked as read.',
    });
  };

  const login = (email?: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('omni_auth', 'true');
    if (email) {
      setUser((prev) => ({ ...prev, email, name: email.split('@')[0] }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('omni_auth', 'false');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        stores,
        currentStore,
        setCurrentStore,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        searchModalOpen,
        setSearchModalOpen,
        notificationsPanelOpen,
        setNotificationsPanelOpen,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        showToast,
        removeToast,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
