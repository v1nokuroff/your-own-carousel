import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { Lang } from '@/typings';

export class RootStore {
    language: Lang = 'en';

    constructor() {
        makeAutoObservable(this);

        void makePersistable(this, {
            name: 'RootStore',
            properties: ['language'],
            storage: localStorage,
        });
    }

    setLanguage(lang: Lang) {
        this.language = lang;
    }
}

export const rootStore = new RootStore();
