import React, { act } from 'react';

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { createRoot, Root } from 'react-dom/client';

import { Label } from './Label';

declare global {
    var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

describe('Label', () => {
    let container: HTMLDivElement;
    let root: Root;
    let previousActEnvironmentValue: boolean | undefined;

    beforeAll(() => {
        previousActEnvironmentValue = globalThis.IS_REACT_ACT_ENVIRONMENT;
        globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    });

    afterAll(() => {
        globalThis.IS_REACT_ACT_ENVIRONMENT = previousActEnvironmentValue;
    });

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        act(() => {
            root.unmount();
        });
        document.body.removeChild(container);
    });

    it('renders value with colon and children', () => {
        act(() => {
            root.render(
                <Label value="Link">
                    <span>https://example.com</span>
                </Label>
            );
        });

        const label = container.querySelector('label');

        expect(label?.textContent).toBe('Link: https://example.com');
    });

    it('renders required mark when required is true', () => {
        act(() => {
            root.render(<Label value="Image URL" required />);
        });

        const label = container.querySelector('label');

        expect(label?.textContent).toBe('Image URL*: ');
    });

    it('applies custom className to wrapper', () => {
        act(() => {
            root.render(<Label value="Description" className="customLabel" />);
        });

        const wrapper = container.firstElementChild;

        expect(wrapper).not.toBeNull();
        expect(wrapper?.classList.contains('label')).toBe(true);
        expect(wrapper?.classList.contains('customLabel')).toBe(true);
    });

    it('forwards label html attributes', () => {
        act(() => {
            root.render(<Label value="Link" htmlFor="slide-link" title="slide link label" />);
        });

        const label = container.querySelector('label');

        expect(label?.getAttribute('for')).toBe('slide-link');
        expect(label?.getAttribute('title')).toBe('slide link label');
    });
});
