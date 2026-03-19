import { makeAutoObservable } from 'mobx';

import type { Lang } from '@/typings';

class RootStore {
    private _language: Lang = 'en';

    constructor() {
        makeAutoObservable(this);
    }

    get language() {
        return this._language;
    }

    setLanguage(lang: Lang) {
        this._language = lang;
    }
}

export const rootStore = new RootStore();
