import { useMemo } from 'react';

import { translations } from '@/translations';

import { useStores } from '../store';

export const useTranslations = () => {
    const { rootStore } = useStores();
    const { language: lang } = rootStore;

    return useMemo(() => translations[lang], [lang]);
};
