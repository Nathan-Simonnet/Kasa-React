import { render, screen, fireEvent } from '@testing-library/react';
import Collapse from './Collapse.jsx';

test('le texte est masqué par défaut et affiché après un clic sur le chevron', () => {
    render(<Collapse tag="description" title="Description" infos="Un texte de description" />);

    const text = screen.getByText('Un texte de description');
    expect(text.parentElement).toHaveClass('hidden');

    fireEvent.click(screen.getByLabelText(/Cliquez ou appuyez sur entrer/i));
    expect(text.parentElement).not.toHaveClass('hidden');
});

test('affiche une liste de paragraphes distincts pour les équipements', () => {
    render(<Collapse tag="equipments" title="Équipements" infos={['Wifi', 'Parking']} />);

    expect(screen.getByText('Wifi')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
});
