import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { Lang } from '@/typings';

class RootStore {
    language: Lang = 'en';

    constructor() {
        makeAutoObservable(this);

        const storage = globalThis?.localStorage || undefined;

        if (storage) {
            void makePersistable(this, {
                name: 'RootStore',
                properties: ['language'],
                storage,
            });
        }
    }

    setLanguage(lang: Lang) {
        this.language = lang;
    }
}

export const rootStore = new RootStore();
