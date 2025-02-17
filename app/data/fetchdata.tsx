import data from './stickers.json'

const CATEGORIE = data.categories;
const STICKERS = CATEGORIE.flatMap(category => category.stickers);

// Export the data for use in other components
export const DATA = data;         // The full data (including categories and stickers)
export const CATEGORIES = CATEGORIE;  // The categories array
export const STICKER = STICKERS;    // All stickers (flattened from all categories)

export const getStickersByCategory = (categorySlug: string) => {
    return CATEGORIE.flatMap((category) =>
        category.slug === categorySlug ? category.stickers : []
    );
};

export const getStickerBySlug = (slug: string) => {
    const sticker = STICKER.find(sticker => sticker.slug === slug);

    if (sticker) {
        // Find the category the sticker belongs to
        const category = CATEGORIE.find(cat =>
            cat.stickers.some(sticker => sticker.slug === slug)
        );

        // Return the sticker with the category data
        return {
            ...sticker,
            category: category ? {
                title: category.title,
                slug: category.slug,
                description: category.description,
                icon: category.icon,  // Assuming each category has an 'icon' field
            } : null,
        };
    }

    return null;  // If the sticker is not found
};
