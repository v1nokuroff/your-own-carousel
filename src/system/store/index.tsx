import React, { useContext } from 'react';

import { rootStore } from './RootStore';

type Props = {
    children: React.ReactNode;
};

export const stores = {
    rootStore,
};

export type Stores = typeof stores;

export const StoresContext = React.createContext<typeof stores>(stores);

export const StoresProvider = ({ children }: Props) => {
    return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};

export const useStores = () => {
    return useContext(StoresContext);
};
