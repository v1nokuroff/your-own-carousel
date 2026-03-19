import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { DEFAULT_SLIDE } from '@/modules/Carousel/constants';
import { CarouselItem } from '@/modules/Carousel/typings';

class CarouselStore {
    slides: CarouselItem[] = [];
    currentSlideIndex = 0;

    constructor() {
        makeAutoObservable(this);

        const storage = globalThis?.localStorage || undefined;

        if (storage) {
            void makePersistable(this, {
                name: 'CarouselStore',
                properties: ['slides'],
                storage,
            });
        }
    }

    get enabledSlides() {
        return this.slides.filter((slide) => slide.enabled).sort((a, b) => a.position - b.position);
    }

    get currentSlide() {
        if (this.enabledSlides.length === 0) {
            return undefined;
        }

        return this.enabledSlides[this.currentSlideIndex % this.enabledSlides.length];
    }

    addSlide = () => {
        const newSlide: CarouselItem = { ...DEFAULT_SLIDE, position: this.slides.length + 1, id: Date.now() };
        this.slides = [...this.slides, newSlide];
    };

    updateSlide = (id: number, field: keyof CarouselItem, value: CarouselItem[keyof CarouselItem]) => {
        this.slides = this.slides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide));
    };

    deleteSlide = (id: number) => {
        this.slides = this.slides.filter((slide) => slide.id !== id);
    };

    toggleSlideEdit = (id: number) => {
        this.slides = this.slides.map((slide) =>
            slide.id === id ? { ...slide, isDrafted: !slide.isDrafted, enabled: false } : slide
        );
    };

    nextSlide = () => {
        if (this.enabledSlides.length === 0) {
            this.currentSlideIndex = 0;
            return;
        }

        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.enabledSlides.length;
    };
}

export const carouselStore = new CarouselStore();
