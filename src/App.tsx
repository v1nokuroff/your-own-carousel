import React from 'react';

import styles from './App.module.css';
import Carousel from './components/Carousel/Carousel';
import { LanguageSwitcher } from './system/LanguageSwitcher/LanguageSwitcher';

const App = () => {
    return (
        <div className={styles.App}>
            <LanguageSwitcher />
            <Carousel />
        </div>
    );
};

export default App;
