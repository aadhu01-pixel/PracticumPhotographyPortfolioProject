
const photos = [
    {
        src: "/images/gallery/festival.jpg",
        alt: "Crowd at an outdoor festival lit by the setting sun",
    },
    {
        src: "/images/gallery/seaside.jpg",
        alt: "Young woman in a black coat looking out over the sea",
    },
    {
        src: "/images/gallery/trench-coat.jpg",
        alt: "Woman in a beige trench coat beside her shadow on a sunlit wall",
    },
    {
        src: "/images/gallery/portrait-man.jpg",
        alt: "Portrait of a smiling man with curly grey hair",
    },
    {
        src: "/images/gallery/valley.jpg",
        alt: "Misty mountain valley and river at sunrise",
    },
    {
        src: "/images/gallery/wedding-toast.jpg",
        alt: "Wedding guests raising glasses for a toast",
    },
];

const positions = [
    "lg:col-start-1 lg:row-[1/5]",
    "lg:col-start-2 lg:row-[1/6]",
    "lg:col-start-3 lg:row-[1/5]",
    "lg:col-start-1 lg:row-[5/9]",
    "lg:col-start-2 lg:row-[6/9]",
    "lg:col-start-3 lg:row-[5/9]",
];

export function Gallery() {
    return (
        <section
            id="gallery"
            className="mx-auto max-w-[1100px] border-t border-border px-6 py-12"
        >
            <h2 className="font-heading text-3xl font-bold">Gallery</h2>
            <p className="mt-3 text-ink-soft">
                A selection of recent portraits, weddings, events and travel.
            </p>

            <div className="mt-8 grid grid-cols-2 auto-rows-[180px] gap-3 sm:auto-rows-[260px] sm:gap-4 lg:h-[640px] lg:grid-cols-[1fr_1.4fr_1fr] lg:grid-rows-8 lg:gap-4">
                {photos.map((photo, index) => (
                    <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        className={`h-full w-full object-cover ${positions[index]}`}
                    />
                ))}
            </div>
        </section>
    );
}
