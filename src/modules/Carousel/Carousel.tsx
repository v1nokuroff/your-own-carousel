import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useTranslations } from '@/root/hooks/useTranslations';
import { useStores } from '@/root/store';

import styles from './Carousel.module.css';

export const Carousel = observer(() => {
    const text = useTranslations();
    const { carouselStore } = useStores();
    const { enabledSlides, currentSlide } = carouselStore;

    // Carousel hook
    useEffect(() => {
        if (enabledSlides.length === 0) {
            return;
        }

        const activeSlide = enabledSlides[carouselStore.currentSlideIndex % enabledSlides.length];
        const delay = activeSlide.delay * 1000 || 3000; // Delay in milliseconds, default to 3 seconds

        const timer = setTimeout(() => {
            carouselStore.nextSlide();
        }, delay);

        return () => clearTimeout(timer);
    }, [carouselStore, carouselStore.currentSlideIndex, enabledSlides]);

    return (
        <div className={styles.root}>
            <h2>{text.slideCarousel}</h2>
            {enabledSlides.length > 0 ? (
                currentSlide && (
                    <div>
                        <a href={currentSlide.link} target="_blank" rel="noreferrer noopener">
                            <img
                                src={currentSlide.path}
                                alt={`Slide ${currentSlide.position}`}
                                className={styles.image}
                            />
                        </a>
                        <p className={styles.description}>{currentSlide.description || text.noDescription}</p>
                    </div>
                )
            ) : (
                <p>{text.noEnabledSlides}</p>
            )}
        </div>
    );
});
