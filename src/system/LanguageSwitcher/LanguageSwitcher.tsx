import React, { useCallback } from 'react';

import { Button } from '@/components/Button/Button';
import { useStores } from '@/root/store';
import { Lang } from '@/typings';

import styles from './LanguageSwitcher.module.css';

export const LanguageSwitcher = () => {
    const { rootStore } = useStores();

    const handleUpdateLanguage = useCallback(
        (lang: Lang) => {
            rootStore.setLanguage(lang);
        },
        [rootStore]
    );

    return (
        <div className={styles.root}>
            <Button className={styles.button} onClick={() => handleUpdateLanguage('ru')}>
                RU
            </Button>
            <Button className={styles.button} onClick={() => handleUpdateLanguage('en')}>
                EN
            </Button>
        </div>
    );
};
