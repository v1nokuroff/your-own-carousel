import React, { act } from 'react';

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createRoot, Root } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';

import { TextInput } from './TextInput';

declare global {
    var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

describe('TextInput', () => {
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
        root.unmount();
        document.body.removeChild(container);
    });

    it('renders input with default text type', () => {
        act(() => {
            root.render(<TextInput value="hello" onChange={() => undefined} />);
        });

        const input = container.querySelector('input');

        expect(input).not.toBeNull();
        expect(input?.getAttribute('type')).toBe('text');
        expect(input?.getAttribute('value')).toBe('hello');
    });

    it('applies custom type and className', () => {
        act(() => {
            root.render(<TextInput value="42" type="number" className="customInput" onChange={() => undefined} />);
        });

        const input = container.querySelector('input');

        expect(input?.getAttribute('type')).toBe('number');
        expect(input?.classList.contains('input')).toBe(true);
        expect(input?.classList.contains('customInput')).toBe(true);
    });

    it('passes changed value to onChange callback', () => {
        const handleChange = jest.fn<(value: string) => void>();

        act(() => {
            root.render(<TextInput value="" onChange={handleChange} />);
        });

        const input = container.querySelector('input') as HTMLInputElement;

        act(() => {
            Simulate.change(input, { target: { value: 'new value' } });
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('new value');
    });

    it('forwards standard input attributes', () => {
        act(() => {
            root.render(<TextInput value="" placeholder="Type here" readOnly onChange={() => undefined} />);
        });

        const input = container.querySelector('input');

        expect(input?.getAttribute('placeholder')).toBe('Type here');
        expect(input?.hasAttribute('readonly')).toBe(true);
    });
});
