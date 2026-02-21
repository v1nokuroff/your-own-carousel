import React from 'react';

import ReactDOM from 'react-dom/client';

import { StoresProvider } from '@/root/store';

import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <StoresProvider>
            <App />
        </StoresProvider>
    </React.StrictMode>
);
