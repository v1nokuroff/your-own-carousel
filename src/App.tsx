import React from 'react';

import Carousel from '@/components/Carousel/Carousel';
import { LanguageSwitcher } from '@/root/LanguageSwitcher/LanguageSwitcher';

import styles from './App.module.css';

export const App = () => {
    return (
        <div className={styles.App}>
            <LanguageSwitcher />
            <Carousel />
        </div>
    );
};
