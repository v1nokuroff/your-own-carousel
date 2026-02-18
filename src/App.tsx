import React, { useState } from 'react';

import Carousel from '@/components/Carousel/Carousel';
import { Lang } from '@/typings';

import styles from './App.module.css';

export type TypeLanguage = Lang;

const App = () => {
    const [language, setLanguage] = useState<TypeLanguage>('en');
    const LanguageSwitcher = () => {
        return (
            <div className={styles.switcher}>
                <button className={styles.button} onClick={() => setLanguage('ru')}>
                    RU
                </button>
                <button className={styles.button} onClick={() => setLanguage('en')}>
                    EN
                </button>
            </div>
        );
    };
    return (
        <div className={'App'}>
            <LanguageSwitcher />
            <Carousel language={language} />
        </div>
    );
};

export default App;
