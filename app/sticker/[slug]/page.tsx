/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react"; // Import React hooks
import { getStickerBySlug, CATEGORIES } from "../../data/fetchdata"; // Import your data utility function
import Link from "next/link";
import Image from "next/image";
import { useParams } from 'next/navigation';  // To get the category slug from the URL

export default function Page() {
    const { slug } = useParams();  // Fetch the category slug from URL
    const [sticker, setSticker] = useState<any>(null); // State for sticker data
    const [loading, setLoading] = useState<boolean>(true); // State for loading
    const [relatedStickers, setRelatedStickers] = useState<any[]>([]); // State for related stickers

    useEffect(() => {
        if (!slug) return; // If no slug, exit early

        const fetchSticker = async () => {
            const stickerData = await getStickerBySlug(slug as string); // Fetch sticker by slug
            if (stickerData) {
                setSticker(stickerData);
                // Fetch related stickers based on category
                const related = CATEGORIES.find((cat) => cat.slug === stickerData?.category?.slug)?.stickers || [];
                setRelatedStickers(related.filter((sticker) => sticker.slug !== slug)); // Exclude the current sticker
            }
            setLoading(false);
        };

        fetchSticker();
    }, [slug]); // Dependency is `slug` so it updates when slug changes

    // Skeleton loader card
    const skeletonCard = (
        <div className="bg-white p-4 border rounded-lg shadow-lg animate-pulse">
            <div className="h-36 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-6 bg-gray-300 mb-2 rounded-md"></div>
            <div className="h-4 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-4 bg-gray-300 w-1/4 rounded-md"></div>
        </div>
    );

    // If loading or no sticker found, display loading or 404 page
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center py-8 px-4">
                <h1 className="text-3xl font-semibold text-gray-900">Loading...</h1>
            </div>
        );
    }

    if (!sticker) {
        return (
            <>
                <head>
                    <title>Sticker Not Found</title>
                    <meta name="description" content="Sticker not found on our platform." />
                    <meta name="robots" content="noindex, nofollow" />
                </head>

                <div className="min-h-screen flex items-center justify-center text-center py-8 px-4">
                    <h1 className="text-3xl font-semibold text-gray-900">Sticker not found</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Sorry, we couldn&apos;t find the sticker you&apos;re looking for.
                    </p>
                </div>
            </>
        );
    }

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = sticker.sticker_path; // Use the sticker's image path to download
        link.download = `${sticker.title}.png`; // Set download filename
        link.click();
    };

    return (
        <>
            <head>
                <title>{`${sticker.title} - Sticker Details`}</title>
                <meta name="description" content={sticker.description} />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={sticker.title} />
                <meta property="og:description" content={sticker.description} />
                <meta property="og:image" content={sticker.sticker_path} />
            </head>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Banner Section */}
                    <div className="relative w-full h-56 border border-black rounded-lg -bg-gray-200 flex justify-center items-center">
                        <img
                            src={sticker.sticker_path}
                            alt={sticker.title}
                            className="object-contain w-full h-full"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                        <button
                            onClick={handleDownload}
                            className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base float-right"
                        >
                            <i className="fas fa-download w-6 h-6" />Download Sticker
                        </button>

                        <h1 className="text-4xl font-bold text-gray-900">Name: {sticker.title}</h1>

                        <p className="mt-4 text-lg text-gray-600">
                            <span className="font-bold">About Sticker: </span>
                            {sticker.description}
                        </p>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Category:{" "}
                                <span className="mt-2 text-md text-gray-500">
                                    {sticker.category.title}
                                </span>
                            </h2>
                            <p className=" mt-4 text-sm text-gray-400">
                                <span className="font-bold">About Sticker Category: </span>
                                {sticker.category.description}
                            </p>
                        </div>

                    </div>
                </div>
                {/* Related Stickers Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Related Stickers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="col-span-1">
                                    {skeletonCard}
                                </div>
                            ))
                            : relatedStickers.length > 0
                                ? relatedStickers.map((relatedSticker) => (
                                    <Link key={relatedSticker.slug} href={`/sticker/${relatedSticker.slug}`}>
                                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex items-center">
                                            <Image
                                                src={relatedSticker.sticker_path}
                                                alt={relatedSticker.title}
                                                width={80}
                                                height={80}
                                                className="rounded-md mr-4"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">{relatedSticker.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                : <div className="col-span-full text-center text-gray-500">No related stickers found</div>}
                    </div>
                </div>
            </div>
        </>
    );
}
