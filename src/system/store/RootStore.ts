import { makeAutoObservable } from 'mobx';

import type { Lang } from '../../typings';

class RootStore {
    language: Lang = 'en';

    constructor() {
        makeAutoObservable(this);
    }

    setLanguage(lang: Lang) {
        this.language = lang;
    }
}

export const rootStore = new RootStore();
