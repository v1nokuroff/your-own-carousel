export type CarouselItem = {
    id: number;
    enabled: boolean;
    delay: number;
    position: number;
    link?: string;
    path?: string;
    description?: string;
    readonly: boolean;
};
