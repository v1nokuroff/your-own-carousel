import React from 'react';

import Carousel from '@/components/Carousel/Carousel';
import { LanguageSwitcher } from '@/root/LanguageSwitcher/LanguageSwitcher';
import { rootStore } from '@/root/store/RootStore';

import styles from './App.module.css';

const App = () => {
    const { language } = rootStore;
    return (
        <div className={styles.App}>
            <LanguageSwitcher />
            <Carousel language={language} />
        </div>
    );
};

export default App;
