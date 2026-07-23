import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './Homepage.js';
import { getRentals } from '../services/rentals.js';

jest.mock('../services/rentals.js');

test('affiche une carte par logement récupéré', async () => {
    getRentals.mockResolvedValue([
        { id: '1', cover: '/a.jpg', title: 'Logement A' },
        { id: '2', cover: '/b.jpg', title: 'Logement B' },
    ]);

    render(<MemoryRouter><Homepage /></MemoryRouter>);

    expect(await screen.findByText('Logement A')).toBeInTheDocument();
    expect(screen.getByText('Logement B')).toBeInTheDocument();
});

test("affiche un message d'erreur si la récupération échoue", async () => {
    getRentals.mockRejectedValue(new Error('Erreur réseau'));

    render(<MemoryRouter><Homepage /></MemoryRouter>);

    expect(await screen.findByText(/erreur est survenue/i)).toBeInTheDocument();
});
