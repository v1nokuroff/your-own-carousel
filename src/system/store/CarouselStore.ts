import { makeAutoObservable } from 'mobx';

import { CarouselItem } from '@/modules/Carousel/typings';

class CarouselStore {
    items: CarouselItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    saveSlide = (slide: CarouselItem) => {
        this.items = [...this.items, slide];
    };

    deleteSlide = (id: number) => {
        this.items = this.items.filter((s) => s.id !== id);
    };
}

export const carouselStore = new CarouselStore();
