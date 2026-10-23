import { useState, useEffect } from "react";

// layout for each grid slot, in gallery order (the photos themselves come from the API)
const positions = [
    "lg:col-start-1 lg:row-[1/5]",
    "lg:col-start-2 lg:row-[1/6] object-[70%_center]",
    "lg:col-start-3 lg:row-[1/5] object-[75%_top]",
    "lg:col-start-1 lg:row-[5/9] object-[center_35%]",
    "lg:col-start-2 lg:row-[6/9]",
    "lg:col-start-3 lg:row-[5/9]",
];

export function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    // only the gallery uses these photos, so it loads them itself
    useEffect(() => {
        async function loadPhotos() {
            try {
                const response = await fetch("/api/photos");
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                setPhotos(await response.json());
            } catch (err) {
                console.error("Failed to load photos", err);
                setError("The gallery couldn't be loaded. Please try again later.");
            }
        }
        loadPhotos();
    }, []);

    return (
        <section
            id="gallery"
            className="mx-auto max-w-[1100px] border-t border-line px-6 py-12"
        >
            <h2 className="font-heading text-[1.5rem] font-bold">Gallery</h2>
            <p className="mt-3 text-ink-soft">
                A selection of recent portraits, weddings, events and travel.
            </p>

            {error && <p role="alert" className="mt-8 text-accent-dark">{error}</p>}

            <div className="mt-8 grid grid-cols-2 auto-rows-[180px] gap-3 sm:auto-rows-[260px] sm:gap-4 lg:h-[640px] lg:grid-cols-[1fr_1.4fr_1fr] lg:grid-rows-8 lg:gap-4">
                {photos.map((photo, index) => (
                    <img
                        key={photo.id}
                        src={photo.url}
                        alt={photo.alt}
                        className={`h-full w-full object-cover ${positions[index] ?? ""}`}
                    />
                ))}
            </div>
        </section>
    );
}
