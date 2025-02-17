'use client';
import React, { useState, useEffect } from "react";
import StickerListing from "./components/StickerListing";
import { CATEGORIES } from "./data/fetchdata";

export default function Home() {
  const [categories, setCategories] = useState<typeof CATEGORIES>([]);

  useEffect(() => {
    setCategories(CATEGORIES ?? []);
    // Set the viewport meta tag dynamically on the client-side
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
    }
  }, []);

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Sticker Shop" />
        <meta name="description" content="Browse the latest stickers" />
        <meta name="keywords" content="stickers" />
        <meta name="author" content="Sticker Shop" />
        <meta name="robots" content="index, follow" />
      </head>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {categories && <StickerListing categories={categories} />}
      </main>
    </>
  );
}
