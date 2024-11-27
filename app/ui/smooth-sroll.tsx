'use client'

import React, { useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    useEffect(() => {
         // Initialize smooth-scrollbar
         const scrollbar = Scrollbar.init(document.querySelector("#scroll-container") as HTMLElement, {
            damping: 0.1, // Adjust this value for smoother/slower scrolling
        });

        // Clean up on component unmount
        return () => {
            if (scrollbar) scrollbar.destroy();
        };
    }, []);

    return (
        <div id="scroll-container" className="h-screen w-full overflow-hidden">
            <div className="content">{children}</div>
        </div>
    );
};

export default SmoothScroll;