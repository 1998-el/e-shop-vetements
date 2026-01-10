import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LoadingContextType {
  isGlobalLoading: () => boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalLoading, setGlobalLoadingState] = useState(false);

  const isGlobalLoading = () => globalLoading;
  const setGlobalLoading = (loading: boolean) => setGlobalLoadingState(loading);

  return (
    <LoadingContext.Provider value={{
      isGlobalLoading,
      setGlobalLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};