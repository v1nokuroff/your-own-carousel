import { useCallback } from 'react';

import { useTranslations } from '@/root/hooks/useTranslations';
import { useStores } from '@/root/store';

import { CarouselItem } from '../typings';

export const useSlidesActions = () => {
    const { carouselStore } = useStores();
    const { slides } = carouselStore;
    const text = useTranslations();

    const handleInputChange = (id: number, field: keyof CarouselItem, value: CarouselItem[keyof CarouselItem]) => {
        carouselStore.updateSlide(id, field, value);
    };

    const handleAddSlide = useCallback(() => {
        carouselStore.addSlide();
    }, [carouselStore]);

    const handleDeleteSlide = useCallback(
        (id: number) => {
            carouselStore.deleteSlide(id);
        },
        [carouselStore]
    );

    const handleEditSlide = useCallback(
        (id: number) => {
            const slide = slides.find((s) => s.id === id);
            if (slide && !slide.path) {
                alert(text.fillData);
                return;
            }
            carouselStore.toggleSlideEdit(id);
        },
        [carouselStore, slides, text]
    );

    return {
        handleInputChange,
        handleAddSlide,
        handleDeleteSlide,
        handleEditSlide,
    };
};
