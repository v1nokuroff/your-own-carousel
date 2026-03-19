import { CarouselItem } from '../typings';

export const defaultSlide: Omit<CarouselItem, 'position'> = {
    id: Date.now(),
    enabled: false,
    delay: 3,
    link: '',
    path: '',
    description: '',
    isDrafted: true,
};
