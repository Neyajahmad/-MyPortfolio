import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ImageGallery({ images, altText }) {
  const [loadedImages, setLoadedImages] = useState({});

  return (
    <div className="flex flex-col gap-8 md:gap-12 mt-16 md:mt-32 w-full">
      {/* Featured Big Screenshot */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full aspect-[16/9] md:aspect-[21/9] bg-text/5 overflow-hidden relative"
      >
        {!loadedImages[0] && (
          <div className="absolute inset-0 bg-text/10 animate-pulse backdrop-blur-2xl" />
        )}
        <motion.img 
          src={images[0]} 
          alt={`${altText} Screenshot 1`}
          onLoad={() => setLoadedImages(prev => ({ ...prev, 0: true }))}
          initial={{ scale: 1.05, filter: 'blur(10px)' }}
          animate={loadedImages[0] ? { scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Two Side-by-Side Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {images.slice(1, 3).map((img, idx) => (
             <motion.div 
               key={idx + 1}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
               className="w-full aspect-square md:aspect-[4/3] bg-text/5 overflow-hidden relative"
             >
                {!loadedImages[idx + 1] && (
                  <div className="absolute inset-0 bg-text/10 animate-pulse backdrop-blur-2xl" />
                )}
                <motion.img 
                  src={img} 
                  alt={`${altText} Screenshot ${idx + 2}`}
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [idx + 1]: true }))}
                  initial={{ scale: 1.05, filter: 'blur(10px)' }}
                  animate={loadedImages[idx + 1] ? { scale: 1, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
             </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
