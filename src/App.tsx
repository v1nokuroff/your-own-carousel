import React from 'react';

import { Carousel } from '@/modules/carousel/Carousel';
import { Configuration } from '@/modules/configuration/Configuration';
import { LanguageSwitcher } from '@/root/components/LanguageSwitcher/LanguageSwitcher';

import styles from './App.module.css';

export const App = () => {
    return (
        <div className={styles.app}>
            <LanguageSwitcher />
            <Carousel />
            <Configuration />
        </div>
    );
};
