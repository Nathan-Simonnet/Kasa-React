import { render, screen, fireEvent } from '@testing-library/react';
import Slideshow from './Slideshow.jsx';
import { getRentals } from '../services/rentals.js';

jest.mock('../services/rentals.js', () => ({
    ...jest.requireActual('../services/rentals.js'),
    getRentals: jest.fn(),
}));

const rental = {
    id: 'abc123',
    pictures: ['/a.jpg', '/b.jpg', '/c.jpg'],
};

beforeEach(() => {
    getRentals.mockResolvedValue([rental]);
});

test('affiche la première photo au montage', async () => {
    render(<Slideshow currentId="abc123" />);
    expect(await screen.findByAltText('Pièce n°1 sur 3')).toHaveAttribute('src', '/a.jpg');
});

test('la flèche droite fait avancer le carrousel et boucle après la dernière photo', async () => {
    render(<Slideshow currentId="abc123" />);
    await screen.findByAltText('Pièce n°1 sur 3');

    const rightArrow = screen.getByLabelText(/vers la droite/i);
    fireEvent.click(rightArrow);
    expect(screen.getByAltText('Pièce n°2 sur 3')).toHaveAttribute('src', '/b.jpg');

    fireEvent.click(rightArrow);
    expect(screen.getByAltText('Pièce n°3 sur 3')).toHaveAttribute('src', '/c.jpg');

    fireEvent.click(rightArrow);
    expect(screen.getByAltText('Pièce n°1 sur 3')).toHaveAttribute('src', '/a.jpg');
});

test('la flèche gauche recule et boucle avant la première photo', async () => {
    render(<Slideshow currentId="abc123" />);
    await screen.findByAltText('Pièce n°1 sur 3');

    fireEvent.click(screen.getByLabelText(/vers la gauche/i));
    expect(screen.getByAltText('Pièce n°3 sur 3')).toHaveAttribute('src', '/c.jpg');
});

test("affiche un placeholder si le logement n'a pas de photo", async () => {
    getRentals.mockResolvedValue([{ id: 'no-pics', pictures: [] }]);
    render(<Slideshow currentId="no-pics" />);
    expect(await screen.findByAltText(/pas de photos disponible/i)).toBeInTheDocument();
});

test("affiche un message d'erreur si la récupération des données échoue", async () => {
    getRentals.mockRejectedValue(new Error('Erreur réseau'));
    render(<Slideshow currentId="abc123" />);
    expect(await screen.findByText(/erreur est survenue/i)).toBeInTheDocument();
});
