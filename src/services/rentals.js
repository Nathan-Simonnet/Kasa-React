const RENTALS_URL = '/logements.json';

export async function getRentals() {
    const response = await fetch(RENTALS_URL);
    if (!response.ok) {
        throw new Error(`Impossible de récupérer les logements (statut ${response.status})`);
    }
    return response.json();
}

export function findRentalById(rentals, id) {
    return rentals.find((rental) => rental.id === id);
}
