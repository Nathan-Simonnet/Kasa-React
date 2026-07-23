import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RentalDetails from './RentalDetails.js';
import { getRentals } from '../services/rentals.js';

jest.mock('../services/rentals.js', () => ({
    ...jest.requireActual('../services/rentals.js'),
    getRentals: jest.fn(),
}));
jest.mock('../components/Slideshow.jsx', () => () => <div>Slideshow mock</div>);

function renderWithRouter(initialPath) {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
                <Route path="/location/:id" element={<RentalDetails />} />
                <Route path="/error" element={<div>Page erreur</div>} />
            </Routes>
        </MemoryRouter>
    );
}

const rental = {
    id: 'abc123',
    title: 'Bel appartement',
    location: 'Paris',
    tags: ['Calme'],
    host: { name: 'Alice', picture: '/alice.jpg' },
    rating: '3',
    description: 'Un bel appartement',
    equipments: ['Wifi'],
};

test('affiche les informations du logement trouvé, y compris la note en étoiles', async () => {
    getRentals.mockResolvedValue([rental]);

    renderWithRouter('/location/abc123');

    expect(await screen.findByText('Bel appartement')).toBeInTheDocument();
    expect(screen.getByLabelText('Noté 3 étoiles sur 5')).toBeInTheDocument();
});

test("redirige vers /error si l'id ne correspond à aucun logement", async () => {
    getRentals.mockResolvedValue([rental]);

    renderWithRouter('/location/id-inconnu');

    expect(await screen.findByText('Page erreur')).toBeInTheDocument();
});

test('affiche un message si la récupération des données échoue', async () => {
    getRentals.mockRejectedValue(new Error('Erreur réseau'));

    renderWithRouter('/location/abc123');

    expect(await screen.findByText(/erreur est survenue/i)).toBeInTheDocument();
});
