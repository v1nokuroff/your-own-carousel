import React from 'react';

import { Carousel } from '@/modules/Carousel/Carousel';
import { LanguageSwitcher } from '@/root/components/LanguageSwitcher/LanguageSwitcher';

import styles from './App.module.css';

export const App = () => {
    return (
        <div className={styles.App}>
            <LanguageSwitcher />
            <Carousel />
        </div>
    );
};
