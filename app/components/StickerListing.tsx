"use client";
import { useState, useEffect } from "react";
import { Category, Sticker } from "../../types/sticker";
import Image from "next/image";
import Link from "next/link";

interface StickerListingProps {
    categories: Category[];
}

const StickerListing: React.FC<StickerListingProps> = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [sortType, setSortType] = useState<string>("popularity");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const stickersPerPage = 9;
    setSelectedCategory("")
    useEffect(() => {
        // Simulate loading data (e.g., fetching from an API)
        setTimeout(() => {
            setLoading(false); // Replace with actual data fetching logic
        }, 1000); // Simulate a delay
    }, []);

    // Ensure categories is not undefined before trying to access it
    const filterStickersByCategory = () => {
        if (!categories) return []; // If categories is undefined or null, return an empty array
        if (selectedCategory === "all") {
            return categories.flatMap((category) => category.stickers);
        } else {
            const category = categories.find((cat) => cat.slug === selectedCategory);
            return category ? category.stickers : [];
        }
    };

    // Filter stickers based on search query
    const filterStickersBySearch = (stickers: Sticker[]) => {
        if (!searchQuery) return stickers;
        return stickers.filter(
            (sticker) =>
                sticker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sticker.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Sort stickers by views or likes
    const sortStickers = (stickers: Sticker[]) => {
        return stickers.sort((a, b) => {
            if (sortType === "views") {
                return b.views - a.views;
            } else if (sortType === "likes") {
                return b.likes - a.likes;
            }
            return 0;
        });
    };

    // Get filtered, sorted, and searched stickers
    const filteredStickers = filterStickersBySearch(filterStickersByCategory());
    const sortedStickers = sortStickers(filteredStickers);

    // Pagination Logic
    const indexOfLastSticker = currentPage * stickersPerPage;
    const indexOfFirstSticker = indexOfLastSticker - stickersPerPage;
    const currentStickers = sortedStickers.slice(indexOfFirstSticker, indexOfLastSticker);

    // Skeleton loader card
    const skeletonCard = (
        <div className="bg-white p-4 border rounded-lg shadow-lg animate-pulse">
            <div className="h-36 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-6 bg-gray-300 mb-2 rounded-md"></div>
            <div className="h-4 bg-gray-300 mb-4 rounded-md"></div>
            <div className="h-4 bg-gray-300 w-1/4 rounded-md"></div>
        </div>
    );

    // Pagination controls
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(sortedStickers.length / stickersPerPage);

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold text-center text-gray-800 mb-6">
                Best Collections of Sticker
            </h1>

            {/* <div className="mb-6">
                <label htmlFor="search-input" className="block text-lg text-gray-700">Search Stickers:</label>
                <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description"
                    className="mt-2 block w-full p-3 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div> */}

            {/* Category and Sort Selection */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-6 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/3">
                    {/*  <label htmlFor="category-select" className="block text-lg text-gray-700">Select Category:</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-2 block w-full p-3 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.title}
                            </option>
                        ))}
                    </select> */}
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-1/3">
                    <label htmlFor="search-input" className="block text-lg text-gray-700">Search Stickers:</label>
                    <input
                        id="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title or description"
                        className="mt-2 block w-full p-3 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Sort Selection */}
                <div className="w-full md:w-1/3">
                    <label htmlFor="sort-select" className="block text-lg text-gray-700">Sort By:</label>
                    <select
                        id="sort-select"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="mt-2 block w-full p-3 border rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="views">Views</option>
                        <option value="likes">Likes</option>
                    </select>
                </div>
            </div>


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
                                <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                                    <Image
                                        src={sticker.sticker_path}
                                        alt={sticker.title}
                                        width={150}
                                        height={150}
                                        className="rounded-md mx-auto mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{sticker.title}</h3>
                                    {/* <p className="text-gray-600 text-sm mb-4">{sticker.description}</p> */}
                                    <div className="text-sm text-gray-500">
                                        Views: {sticker.views} | Likes: {sticker.likes}
                                    </div>
                                </div>
                            </Link>
                        ))
                        : <div className="col-span-full text-center text-gray-500">No stickers available</div>}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Prev
                    </button>
                    <span className="mx-2 mt-2">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
};

export default StickerListing;
