"use client";
import React, { useState, useEffect } from "react";
import StickerListing from "../components/StickerListing";
import { CATEGORIES } from "../data/fetchdata";

// Define the expected Category type
interface Sticker {
    title: string;
    slug: string;
    description: string;
    sticker_path: string;
    views: number;
    likes: number;
}

interface Category {
    title: string;
    slug: string;
    description: string;
    icon?: string; // Optional field
    stickers: Sticker[];
}

const Page = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (Array.isArray(CATEGORIES) && CATEGORIES.length > 0) {
            // Ensure type compatibility
            const formattedCategories: Category[] = CATEGORIES.map((cat) => ({
                title: cat.title,
                slug: cat.slug,
                description: cat.description,
                icon: cat.icon, // Optional
                stickers: cat.stickers.map((sticker) => ({
                    title: sticker.title,
                    slug: sticker.slug,
                    description: sticker.description,
                    sticker_path: sticker.sticker_path,
                    views: sticker.views,
                    likes: sticker.likes,
                })),
            }));

            setCategories(formattedCategories);
            setLoading(false);
        } else {
            setCategories([]);
            setLoading(false);
            setError("No categories available");
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {categories.length > 0 ? (
                <StickerListing categories={categories} />
            ) : (
                <div>No categories available</div>
            )}
        </div>
    );
};

export default Page;
