'use client';

import { useState, useEffect } from 'react';

export function useResponsiveMaze() {
  const [cellSize, setCellSize] = useState(50);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calculateCellSize = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        // For mobile: calculate based on available viewport
        // Account for HUD (~80px), padding (32px), and buttons
        const availableHeight = window.innerHeight - 120; // HUD + padding
        const availableWidth = window.innerWidth - 32; // padding
        
        // Use the smaller dimension to ensure it fits
        const maxDimension = Math.min(availableHeight, availableWidth);
        
        // For easy level (8x8 grid), we want the maze to fit
        // Add some margin for the border
        const maxCellSize = Math.floor(maxDimension / 8.5);
        
        // Set reasonable bounds
        const minCellSize = 25;
        const maxCellSizeLimit = 60;
        
        setCellSize(Math.max(minCellSize, Math.min(maxCellSize, maxCellSizeLimit)));
      } else {
        // Desktop: use default sizes
        setCellSize(50);
      }
    };

    calculateCellSize();
    window.addEventListener('resize', calculateCellSize);
    
    return () => window.removeEventListener('resize', calculateCellSize);
  }, []);

  return { cellSize, isMobile };
}
