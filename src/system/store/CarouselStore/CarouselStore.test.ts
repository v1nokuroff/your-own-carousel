import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { CarouselStore } from './CarouselStore';

const makeStore = () => new CarouselStore();
const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('CarouselStore', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('mutations', () => {
        it('adds a slide with default fields', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(123);

            store.addSlide();

            expect(store.slides).toHaveLength(1);
            expect(store.slides[0]).toMatchObject({
                id: 123,
                position: 1,
                enabled: false,
                delay: 3,
                link: '',
                path: '',
                description: '',
                isDrafted: true,
            });

            nowSpy.mockRestore();
        });

        it('updates a slide field', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1);

            store.addSlide();
            store.updateSlide(1, 'link', 'https://example.com');

            expect(store.slides[0].link).toBe('https://example.com');

            nowSpy.mockRestore();
        });

        it('deletes a slide', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1);

            store.addSlide();
            store.deleteSlide(1);

            expect(store.slides).toHaveLength(0);

            nowSpy.mockRestore();
        });

        it('toggles slide draft status and disables it', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1);

            store.addSlide();
            store.updateSlide(1, 'enabled', true);
            store.toggleSlideEdit(1);

            expect(store.slides[0].isDrafted).toBe(false);
            expect(store.slides[0].enabled).toBe(false);

            nowSpy.mockRestore();
        });
    });

    describe('selectors', () => {
        it('returns only enabled slides sorted by position', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now');
            nowSpy.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(3);

            store.addSlide();
            store.addSlide();
            store.addSlide();

            store.updateSlide(1, 'enabled', true);
            store.updateSlide(2, 'enabled', true);
            store.updateSlide(3, 'enabled', false);
            store.updateSlide(1, 'position', 3);
            store.updateSlide(2, 'position', 1);

            const enabled = store.enabledSlides;

            expect(enabled).toHaveLength(2);
            expect(enabled[0].id).toBe(2);
            expect(enabled[1].id).toBe(1);

            nowSpy.mockRestore();
        });

        it('returns undefined when there are no enabled slides', () => {
            const store = makeStore();

            expect(store.currentSlide).toBeUndefined();
        });
    });

    describe('navigation', () => {
        it('cycles through enabled slides with nextSlide', () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now');
            nowSpy.mockReturnValueOnce(1).mockReturnValueOnce(2);

            store.addSlide();
            store.addSlide();
            store.updateSlide(1, 'enabled', true);
            store.updateSlide(2, 'enabled', true);
            store.updateSlide(1, 'position', 1);
            store.updateSlide(2, 'position', 2);

            expect(store.currentSlide?.id).toBe(1);

            store.nextSlide();
            expect(store.currentSlide?.id).toBe(2);

            store.nextSlide();
            expect(store.currentSlide?.id).toBe(1);

            nowSpy.mockRestore();
        });

        it('resets currentSlideIndex when no enabled slides', () => {
            const store = makeStore();

            store.currentSlideIndex = 3;
            store.nextSlide();

            expect(store.currentSlideIndex).toBe(0);
        });
    });

    describe('data-persistence', () => {
        it('persists slides to localStorage', async () => {
            const store = makeStore();
            const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(42);

            store.addSlide();

            await flushPromises();

            const raw = localStorage.getItem('CarouselStore');
            expect(raw).not.toBeNull();

            const parsed = JSON.parse(raw as string) as { slides: unknown[] };
            expect(parsed.slides).toHaveLength(1);
            expect(parsed.slides[0]).toMatchObject({
                id: 42,
                position: 1,
                enabled: false,
                delay: 3,
                link: '',
                path: '',
                description: '',
                isDrafted: true,
            });

            nowSpy.mockRestore();
        });

        it('hydrates slides from localStorage', async () => {
            localStorage.setItem(
                'CarouselStore',
                JSON.stringify({
                    slides: [
                        {
                            id: 7,
                            enabled: true,
                            delay: 5,
                            position: 2,
                            link: 'https://example.com',
                            path: '/image.png',
                            description: 'Example',
                            isDrafted: false,
                        },
                    ],
                })
            );

            const store = makeStore();

            await flushPromises();

            expect(store.slides).toHaveLength(1);
            expect(store.slides[0]).toMatchObject({
                id: 7,
                enabled: true,
                delay: 5,
                position: 2,
                link: 'https://example.com',
                path: '/image.png',
                description: 'Example',
                isDrafted: false,
            });
        });
    });
});
