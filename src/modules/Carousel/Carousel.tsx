import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { useStores } from '@/root/store';
import { translations } from '@/translations';

import styles from './Carousel.module.css';
import { defaultSlide } from './constants';
import { CarouselItem } from './typings';

export const Carousel = observer(() => {
    const { rootStore } = useStores();
    const { language } = rootStore;

    const text = useMemo(() => translations[language], [language]);

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
                prevSlides.map((s) => (s.id === id ? { ...s, readonly: !s.readonly, enabled: false } : s))
            );
        },
        [slides, language]
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
                {slides.map(({ id, enabled, readonly, delay, position, link, path, description }) => (
                    <div className={styles.slideForm} key={id}>
                        <input
                            className={`${styles.input} ${styles.checkbox}`}
                            readOnly={readonly}
                            type="checkbox"
                            checked={enabled}
                            onChange={
                                (e) => handleInputChange(id, 'enabled', e.target.checked)
                                //   handleEditSlide(slide.id, 'enable')
                            }
                        />
                        <label>{text.enable}</label>
                        <div>
                            <label>
                                {text.delay}:{' '}
                                {readonly ? (
                                    delay
                                ) : (
                                    <input
                                        className={styles.input}
                                        style={{ width: '300px' }}
                                        readOnly={readonly}
                                        type="number"
                                        value={delay}
                                        onChange={(e) => handleInputChange(id, 'delay', +e.target.value)}
                                    />
                                )}
                            </label>
                        </div>
                        <div>
                            <label>
                                {text.position}:{' '}
                                {readonly ? (
                                    position
                                ) : (
                                    <input
                                        className={styles.input}
                                        readOnly={readonly}
                                        type="number"
                                        value={position}
                                        onChange={(e) => handleInputChange(id, 'position', +e.target.value)}
                                    />
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.link}:{' '}
                                {readonly ? (
                                    link
                                ) : (
                                    <input
                                        className={styles.input}
                                        readOnly={readonly}
                                        type="text"
                                        value={link}
                                        onChange={(e) => handleInputChange(id, 'link', e.target.value)}
                                    />
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.imageURL}:{' '}
                                {readonly ? (
                                    path
                                ) : (
                                    <input
                                        className={styles.input}
                                        readOnly={readonly}
                                        type="text"
                                        value={path}
                                        onChange={(e) => handleInputChange(id, 'path', e.target.value)}
                                    />
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.description}:{' '}
                                {readonly ? (
                                    description
                                ) : (
                                    <textarea
                                        className={styles.input}
                                        readOnly={readonly}
                                        value={description}
                                        onChange={(e) => handleInputChange(id, 'description', e.target.value)}
                                        rows={3}
                                        style={{ width: '100%', resize: 'vertical' }}
                                    />
                                )}
                            </label>
                        </div>
                        <div className={`${styles.buttonGroup} ${styles.form}`}>
                            <Button className={styles.button} onClick={() => handleDeleteSlide(id)}>
                                {text.deleteSlide}
                            </Button>
                            <Button className={styles.button} onClick={() => handleEditSlide(id)}>
                                {readonly ? text.edit : text.save}
                            </Button>
                        </div>
                    </div>
                ))}
                <Button className={`${styles.button} ${styles.create}`} onClick={handleAddSlide}>
                    {text.createNewSlide}
                </Button>
            </div>
        </div>
    );
});
