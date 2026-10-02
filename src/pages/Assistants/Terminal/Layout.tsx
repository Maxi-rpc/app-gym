import React from 'react';

import ThemeTogglerTwo from '../../../components/common/ThemeTogglerTwo';
import Carousel from '../../../components/ui/carousel/Carousel';

const carouselSlides = [
    { src: 'images/carousel/carousel-01.png', alt: 'Imagen del carrusel 1' },
    { src: 'images/carousel/carousel-02.png', alt: 'Imagen del carrusel 2' },
    { src: 'images/carousel/carousel-03.png', alt: 'Imagen del carrusel 3' },
    { src: 'images/carousel/carousel-04.png', alt: 'Imagen del carrusel 4' },
];

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
                {children}
                <div className="hidden h-full w-full items-center bg-brand-950 dark:bg-white/5 lg:grid lg:w-1/2">
                    <div className="relative z-1 flex h-[90%] w-[90%] items-center justify-center justify-self-center">
                        <Carousel slides={carouselSlides} autoplay />
                    </div>
                </div>
                <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
                    <ThemeTogglerTwo />
                </div>
            </div>
        </div>
    );
}
