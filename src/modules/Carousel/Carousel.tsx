import React, { useEffect } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { Label } from '@/components/Label/Label';
import { TextInput } from '@/components/TextInput/TextInput';
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

            <div className={styles.editor}>
                <h2 style={{ textAlign: 'center' }}>{text.slideManagement}</h2>
                {slides.map(({ id, enabled, isDrafted, delay, position, link, path, description }) => (
                    <div className={styles.slideForm} key={id}>
                        <Label value={text.enable}>
                            <input
                                id="isEnabled"
                                className={cn(styles.control, styles.checkbox)}
                                disabled={isDrafted}
                                type="checkbox"
                                checked={enabled}
                                onChange={({ target: { checked } }) => handleInputChange(id, 'enabled', checked)}
                            />
                        </Label>
                        <div>
                            <Label value={text.delay}>
                                {isDrafted ? (
                                    <TextInput
                                        id="delay"
                                        className={styles.control}
                                        style={{ width: '300px' }}
                                        readOnly={!isDrafted}
                                        type="number"
                                        value={delay}
                                        onChange={(value) => handleInputChange(id, 'delay', +value)}
                                    />
                                ) : (
                                    delay
                                )}
                            </Label>
                        </div>
                        <Label value={text.position}>
                            {isDrafted ? (
                                <TextInput
                                    id="position"
                                    className={styles.control}
                                    readOnly={!isDrafted}
                                    type="number"
                                    value={position}
                                    min={1}
                                    onChange={(value) => handleInputChange(id, 'position', +value)}
                                />
                            ) : (
                                position
                            )}
                        </Label>
                        <Label value={text.link}>
                            {isDrafted ? (
                                <TextInput
                                    id="link"
                                    readOnly={!isDrafted}
                                    value={link}
                                    onChange={(value) => handleInputChange(id, 'link', value)}
                                />
                            ) : (
                                link
                            )}
                        </Label>
                        <Label value={text.imageURL} required>
                            {isDrafted ? (
                                <TextInput
                                    id="path"
                                    readOnly={!isDrafted}
                                    value={path}
                                    onChange={(value) => handleInputChange(id, 'path', value)}
                                />
                            ) : (
                                path
                            )}
                        </Label>
                        <Label value={text.description}>
                            {isDrafted ? (
                                <textarea
                                    id="description"
                                    className={styles.control}
                                    readOnly={!isDrafted}
                                    value={description}
                                    onChange={({ target: { value } }) => handleInputChange(id, 'description', value)}
                                    rows={3}
                                    style={{ width: '100%', resize: 'vertical' }}
                                />
                            ) : (
                                description
                            )}
                        </Label>
                        <div className={styles.buttonGroup}>
                            <Button onClick={() => handleDeleteSlide(id)}>{text.deleteSlide}</Button>
                            <Button onClick={() => handleEditSlide(id)}>{isDrafted ? text.save : text.edit}</Button>
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
