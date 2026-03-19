import React, { useEffect } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { useTranslations } from '@/root/hooks/useTranslations';
import { useStores } from '@/root/store';

import styles from './Carousel.module.css';
import { useSlidesActions } from './hooks/useSlidesActions';

export const Carousel = observer(() => {
    const text = useTranslations();
    const { carouselStore } = useStores();
    const { slides, enabledSlides, currentSlide } = carouselStore;
    const { handleAddSlide, handleDeleteSlide, handleEditSlide, handleInputChange } = useSlidesActions();

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
                            onChange={({ target: { checked } }) => handleInputChange(id, 'enabled', checked)}
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
                                        onChange={({ target: { value } }) => handleInputChange(id, 'delay', +value)}
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
                                        min={1}
                                        onChange={({ target: { value } }) => handleInputChange(id, 'position', +value)}
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
                                        onChange={({ target: { value } }) => handleInputChange(id, 'link', value)}
                                    />
                                ) : (
                                    link
                                )}
                            </label>
                        </div>
                        <div className={styles.label}>
                            <label>
                                {text.imageURL}*:{' '}
                                {isDrafted ? (
                                    <input
                                        className={styles.input}
                                        readOnly={!isDrafted}
                                        type="text"
                                        value={path}
                                        onChange={({ target: { value } }) => handleInputChange(id, 'path', value)}
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
                                        onChange={({ target: { value } }) =>
                                            handleInputChange(id, 'description', value)
                                        }
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
