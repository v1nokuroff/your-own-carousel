import { CarouselItem } from '../typings';

export const DEFAULT_SLIDE: Omit<CarouselItem, 'position' | 'id'> = {
    enabled: false,
    delay: 3,
    link: '',
    path: '',
    description: '',
    isDrafted: true,
};
