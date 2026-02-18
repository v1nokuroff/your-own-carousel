import type { Lang } from '../typings';

class RootStore {
    private _language: Lang = 'en';

    get language() {
        return this._language;
    }

    set language(lang: Lang) {
        this._language = lang;
    }
}

export const rootStore = new RootStore()
