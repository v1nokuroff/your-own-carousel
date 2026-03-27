import React from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { Label } from '@/components/Label/Label';
import { TextInput } from '@/components/TextInput/TextInput';
import { useTranslations } from '@/root/hooks/useTranslations';
import { useStores } from '@/root/store';

import styles from './Configuration.module.css';
import { useSlidesActions } from './hooks/useSlidesActions';

export const Configuration = observer(() => {
    const text = useTranslations();
    const { carouselStore } = useStores();
    const { slides } = carouselStore;
    const { handleAddSlide, handleDeleteSlide, handleEditSlide, handleInputChange } = useSlidesActions();

    return (
        <div className={styles.root}>
            <h2 style={{ textAlign: 'center' }}>{text.slideManagement}</h2>
            {slides.map(({ id, enabled, isDrafted, delay, position, link, path, description }) => (
                <div className={styles.slideForm} key={id}>
                    <div className={styles.inputs}>
                        <Label value={text.enable}>
                            <input
                                id="isEnabled"
                                className={styles.checkbox}
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
                    </div>
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
    );
});
