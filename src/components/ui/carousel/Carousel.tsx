import { useEffect, useState } from 'react';
import { publicAsset } from '../../../utils/publicAsset';

export type CarouselSlide = {
    src: string;
    alt: string;
};

export type CarouselProps = {
    slides: CarouselSlide[];
    autoplay?: boolean;
    autoplayInterval?: number;
};

export default function Carousel({
    slides,
    autoplay = true,
    autoplayInterval = 5000,
}: CarouselProps) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (!autoplay || slides.length < 2) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveSlide(
                (currentSlide) => (currentSlide + 1) % slides.length,
            );
        }, autoplayInterval);

        return () => window.clearInterval(interval);
    }, [autoplay, autoplayInterval, slides.length]);

    useEffect(() => {
        if (activeSlide >= slides.length) {
            setActiveSlide(0);
        }
    }, [activeSlide, slides.length]);

    if (slides.length === 0) {
        return null;
    }

    const showSlide = (index: number) => {
        setActiveSlide((index + slides.length) % slides.length);
    };

    return (
        <section
            aria-label="Carrusel de imágenes"
            className="relative h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        >
            <div className="h-full overflow-hidden">
                <div
                    className="flex h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    aria-live="off"
                >
                    {slides.map((slide, index) => (
                        <div
                            key={slide.src}
                            className="h-full w-full shrink-0"
                            aria-hidden={activeSlide !== index}
                        >
                            <img
                                className="h-full w-full object-cover"
                                src={publicAsset(slide.src)}
                                alt={slide.alt}
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {slides.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => showSlide(activeSlide - 1)}
                        aria-label="Mostrar imagen anterior"
                        className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900"
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="m15 18-6-6 6-6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => showSlide(activeSlide + 1)}
                        aria-label="Mostrar imagen siguiente"
                        className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900"
                    >
                        <svg
                            className="size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="m9 18 6-6-6-6"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div
                        className="absolute inset-x-0 bottom-4 flex justify-center gap-2"
                        aria-label="Seleccionar imagen"
                    >
                        {slides.map((slide, index) => (
                            <button
                                key={slide.src}
                                type="button"
                                onClick={() => showSlide(index)}
                                aria-label={`Mostrar imagen ${index + 1}`}
                                aria-current={
                                    activeSlide === index ? 'true' : undefined
                                }
                                className={`size-2.5 rounded-full border border-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                                    activeSlide === index
                                        ? 'bg-white'
                                        : 'bg-white/40 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
