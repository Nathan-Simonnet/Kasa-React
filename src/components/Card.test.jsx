import { render, screen } from '@testing-library/react';
import Card from './Card.jsx';

test('affiche le titre, l\'image et le lien vers le logement', () => {
    render(<Card id="abc123" img="/photo.jpg" title="Bel appartement" />);

    expect(screen.getByText('Bel appartement')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/location/abc123');
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo.jpg');
});
