import React, { useState, useEffect, useCallback } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { useTranslations } from '@/root/hooks/useTranslations';

import styles from './Carousel.module.css';
import { defaultSlide } from './constants';
import { CarouselItem } from './typings';

export const Carousel = observer(() => {
    const text = useTranslations();

    const [slides, setSlides] = useState<CarouselItem[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

    // Carousel hook
    useEffect(() => {
        const enabledSlides = slides.filter((slide) => slide.enabled).sort((a, b) => a.position - b.position);

        if (enabledSlides.length === 0) {
            return;
        }

        const currentSlide = enabledSlides[currentSlideIndex % enabledSlides.length];
        const delay = currentSlide.delay * 1000 || 3000; // Delay in milliseconds, default to 3 seconds

        const timer = setTimeout(() => {
            setCurrentSlideIndex((prevIndex: number) => (prevIndex + 1) % enabledSlides.length);
        }, delay);

        return () => clearTimeout(timer);
    }, [currentSlideIndex, slides]);

    const handleInputChange = (id: number, field: keyof CarouselItem, value: string | boolean | number) => {
        setSlides((prevSlides) => prevSlides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)));
    };

    const handleAddSlide = useCallback(() => {
        const newSlide: CarouselItem = { ...defaultSlide, position: slides.length + 1 };
        setSlides((prevSlides) => [...prevSlides, newSlide]);
    }, [slides, setSlides]);

    const handleDeleteSlide = useCallback((id: number) => {
        setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id));
    }, []);

    const handleEditSlide = useCallback(
        (id: number) => {
            const slide = slides.find((s) => s.id === id);
            if (slide && !slide.path) {
                alert(text.fillData);
                return;
            }
            setSlides((prevSlides) =>
                prevSlides.map((s) => (s.id === id ? { ...s, isDrafted: !s.isDrafted, enabled: false } : s))
            );
        },
        [slides, text]
    );

    const enabledSlides = slides.filter((slide) => slide.enabled).sort((a, b) => a.position - b.position);

    const currentSlide = enabledSlides[currentSlideIndex % enabledSlides.length];

    return (
        <div className={styles.container}>
            {/* Slides carousel block */}
            <div className={styles.carousel}>
                <h2>{text.slideCarousel}</h2>
                {enabledSlides.length > 0 ? (
                    currentSlide && (
                        <div>
                            <a href={currentSlide.link} target="_blank" rel="noreferrer noopener">
                                <img
                                    src={currentSlide.path || 'https://via.placeholder.com/600x300'}
                                    alt={`Slide ${currentSlide.position}`}
                                    className={styles.image}
                                />
                            </a>
                            <p className={styles.label}>{currentSlide.description || text.noDescription}</p>
                        </div>
                    )
                ) : (
                    <p>{text.noEnabledSlides}</p>
                )}
            </div>

            {/* Creating and editing slides Block */}
            <div className={styles.editor}>
                <h2 style={{ textAlign: 'center' }}>{text.slideManagement}</h2>
                {slides.map(({ id, enabled, isDrafted, delay, position, link, path, description }) => (
                    <div className={styles.slideForm} key={id}>
                        <input
                            className={cn(styles.input, styles.checkbox)}
                            disabled={isDrafted}
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => handleInputChange(id, 'enabled', e.target.checked)}
                        />
                        <label>{text.enable}</label>
                        <div>
                            <label>
                                {text.delay}:{' '}
                                {isDrafted ? (
                                    <input
                                        className={styles.input}
                                        style={{ width: '300px' }}
                                        readOnly={!isDrafted}
                                        type="number"
                                        value={delay}
                                        onChange={(e) => handleInputChange(id, 'delay', +e.target.value)}
                                    />
                                ) : (
                                    delay
                                )}
                            </label>
                        </div>
                        <div>
                            <label>
                                {text.position}:{' '}
                                {isDrafted ? (
                                    <input
                                        className={styles.input}
                                        readOnly={!isDrafted}
                                        type="number"
                                        value={position}
                                        onChange={(e) => handleInputChange(id, 'position', +e.target.value)}
                                    />
                                ) : (
                                    position
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.link}:{' '}
                                {isDrafted ? (
                                    <input
                                        className={styles.input}
                                        readOnly={!isDrafted}
                                        type="text"
                                        value={link}
                                        onChange={(e) => handleInputChange(id, 'link', e.target.value)}
                                    />
                                ) : (
                                    link
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.imageURL}:{' '}
                                {isDrafted ? (
                                    <input
                                        className={styles.input}
                                        readOnly={!isDrafted}
                                        type="text"
                                        value={path}
                                        onChange={(e) => handleInputChange(id, 'path', e.target.value)}
                                    />
                                ) : (
                                    path
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.description}:{' '}
                                {isDrafted ? (
                                    <textarea
                                        className={styles.input}
                                        readOnly={!isDrafted}
                                        value={description}
                                        onChange={(e) => handleInputChange(id, 'description', e.target.value)}
                                        rows={3}
                                        style={{ width: '100%', resize: 'vertical' }}
                                    />
                                ) : (
                                    description
                                )}
                            </label>
                        </div>
                        <div className={styles.buttonGroup}>
                            <Button onClick={() => handleDeleteSlide(id)}>{text.deleteSlide}</Button>
                            <Button className={styles.button} onClick={() => handleEditSlide(id)}>
                                {isDrafted ? text.save : text.edit}
                            </Button>
                        </div>
                    </div>
                ))}
                <Button className={styles.createBtn} onClick={handleAddSlide}>
                    {text.createNewSlide}
                </Button>
            </div>
        </div>
    );
});
