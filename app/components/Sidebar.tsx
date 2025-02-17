"use client";

import Link from "next/link";
import { CATEGORIES } from "../data/fetchdata";
import Image from "next/image";

export default function Sidebar() {
    const categories = CATEGORIES || [];

    return (
        <aside className="sticky top-0 w-64 p-6 bg-white text-black shadow-md h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <Link href="/" className="block">
                <Image
                    src="/logo.png"   // Path to the logo image file
                    alt="Sticker Shop"
                    width={150}        // Set the width of the logo
                    height={50}        // Set the height of the logo
                    className="object-contain"  // Ensures the image maintains its aspect ratio
                />
            </Link>
            <Link href="/" className="text-xl font-bold mb-4">
                Home
            </Link>
            <hr />
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <div className="flex flex-col gap-2">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
                        <i className={`fas ${category.icon} w-6 h-6`} />

                        <span>{category.title}</span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
