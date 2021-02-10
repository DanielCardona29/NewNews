import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import a from './Pruebas';

test('test de prueba 1', () => {
    expect(a(1, 1)).toBe(2);
});

test('Render App', () => {
    render( < App / > )
})