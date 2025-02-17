"use client"
import { useState } from 'react';
import { STICKER } from '../data/fetchdata'; // Import all stickers

const StickerSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStickers, setFilteredStickers] = useState(STICKER);

    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter stickers based on search query (search title or description)
        const result = STICKER.filter(
            sticker =>
                sticker.title.toLowerCase().includes(query) ||
                sticker.description.toLowerCase().includes(query)
        );
        setFilteredStickers(result);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search stickers..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />

            <div className="mt-4">
                {filteredStickers.length > 0 ? (
                    filteredStickers.map(sticker => (
                        <div key={sticker.slug} className="flex items-center space-x-4 mb-4">
                            <img
                                src={sticker.sticker_path}
                                alt={sticker.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <h3 className="font-bold">{sticker.title}</h3>
                                <p>{sticker.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No stickers found</p>
                )}
            </div>
        </div>
    );
};

export default StickerSearch;
