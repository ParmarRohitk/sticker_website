/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';  // To get the category slug from the URL
import { CATEGORIES } from '../../data/fetchdata';  // Import necessary data
import { useEffect, useState } from 'react';  // For managing the component state

const CategoryPage = () => {
    const { slug } = useParams();  // Fetch the category slug from URL
    const [category, setCategory] = useState<any>(null);  // To store category data
    const [stickers, setStickers] = useState<any[]>([]);  // To store filtered stickers
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Replace with actual data fetching logic
        }, 1000); // Simulate a delay
        if (slug) {
            const foundCategory = CATEGORIES.find(cat => cat.slug === slug);  // Find category by slug
            if (foundCategory) {
                setCategory(foundCategory);
                setStickers(foundCategory.stickers);  // Directly use the stickers from the found category
            }
        }
    }, [slug]);  // Runs every time the `slug` changes

    // Skeleton loader card
    const skeletonCard = (
        <div className="bg-white p-4 border rounded-lg shadow-lg animate-pulse">
            <div className="h-36 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-6 bg-gray-300 mb-2 rounded-md"></div>
            <div className="h-4 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-4 bg-gray-300 w-1/4 rounded-md"></div>
        </div>
    );

    const currentStickers = stickers;

    if (!category) {
        return <div>Loading...</div>;  // Show loading message while data is being fetched
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-semibold text-center mb-4">{category.title}</h1>
            <p className="text-center text-gray-600 mb-6">{category.description}</p>

            {/* Sticker List */}
            <div id="sticker-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="col-span-1">
                            {skeletonCard}
                        </div>
                    ))
                    : currentStickers.length > 0
                        ? currentStickers.map((sticker) => (
                            <Link key={sticker.slug} href={`/sticker/${sticker.slug}`}>
                                <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex items-center">
                                    <Image
                                        src={sticker.sticker_path}
                                        alt={sticker.title}
                                        width={80}
                                        height={80}
                                        className="rounded-md mr-4"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{sticker.title}</h3>
                                    </div>
                                </div>
                            </Link>

                        ))
                        : <div className="col-span-full text-center text-gray-500">No stickers available</div>}
            </div>
        </div>
    );
};

export default CategoryPage;
