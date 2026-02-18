import React from 'react';

import { Button } from '@/components/Button/Button';
import { rootStore } from '@/root/store/RootStore';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
    return (
        <div className={styles.root}>
            <Button className={styles.button} onClick={() => (rootStore.language = 'ru')}>
                RU
            </Button>
            <Button className={styles.button} onClick={() => (rootStore.language = 'en')}>
                EN
            </Button>
        </div>
    );
};
