import { test, expect } from '@playwright/test';

test('la page d\'accueil affiche des logements et mène à une page de détail', async ({ page }) => {
    await page.goto('/');

    const firstCard = page.locator('.rental-card_link').first();
    await expect(firstCard).toBeVisible();

    await firstCard.click();
    await expect(page).toHaveURL(/\/location\//);
    await expect(page.locator('.rental_title')).toBeVisible();
});

test('un identifiant de logement inconnu redirige vers la page 404', async ({ page }) => {
    await page.goto('/location/id-inexistant');
    await expect(page.locator('.error_title')).toHaveText('404');
});

test('la navigation vers "À propos" fonctionne sans rechargement complet', async ({ page }) => {
    await page.goto('/');
    await page.locator('#about_link').click();
    await expect(page).toHaveURL(/\/a-propos/);
    await expect(page.locator('.about_dropdown').first()).toBeVisible();
});
