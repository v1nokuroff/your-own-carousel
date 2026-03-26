import React, { useContext } from 'react';

import { carouselStore } from './CarouselStore/CarouselStore';
import { rootStore } from './RootStore';

type Props = {
    children: React.ReactNode;
};

export const stores = {
    rootStore,
    carouselStore,
};

export type Stores = typeof stores;

export const StoresContext = React.createContext<typeof stores>(stores);

export const StoresProvider = ({ children }: Props) => {
    return <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;
};

export const useStores = () => {
    return useContext(StoresContext);
};
