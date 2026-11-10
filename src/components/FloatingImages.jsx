import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 8 local tech images
const TECH_IMAGES = [
  '/images/tech/code.png',
  '/images/tech/circuit.png',
  '/images/tech/keyboard.png',
  '/images/tech/ai-brain.png',
  '/images/tech/server.png',
  '/images/tech/mobile-ui.png',
  '/images/tech/monitor.png',
  '/images/tech/react.png',
];

// 32 spawn zones covering the ENTIRE screen, all corners and edges
const SPAWN_ZONES = [
  // Top row
  { top: '2%',  left: '2%'  }, { top: '3%',  left: '17%' },
  { top: '1%',  left: '34%' }, { top: '2%',  left: '52%' },
  { top: '3%',  left: '68%' }, { top: '1%',  left: '82%' },
  // Upper band
  { top: '12%', left: '1%'  }, { top: '14%', left: '20%' },
  { top: '11%', left: '40%' }, { top: '13%', left: '58%' },
  { top: '12%', left: '76%' }, { top: '10%', left: '88%' },
  // Middle-left column (avoids center text)
  { top: '28%', left: '1%'  }, { top: '38%', left: '3%'  },
  { top: '48%', left: '1%'  }, { top: '58%', left: '3%'  },
  // Middle-right column (avoids center text)
  { top: '28%', left: '80%' }, { top: '38%', left: '82%' },
  { top: '48%', left: '80%' }, { top: '58%', left: '82%' },
  // Lower band
  { top: '68%', left: '2%'  }, { top: '70%', left: '22%' },
  { top: '69%', left: '42%' }, { top: '68%', left: '62%' },
  { top: '70%', left: '80%' }, { top: '72%', left: '88%' },
  // Bottom row
  { top: '80%', left: '5%'  }, { top: '82%', left: '24%' },
  { top: '83%', left: '44%' }, { top: '81%', left: '64%' },
  { top: '85%', left: '80%' }, { top: '88%', left: '90%' },
];

// Card size: slightly bigger than before so images "cover" more area
function getCardSize() {
  if (typeof window === 'undefined') return 75;
  if (window.innerWidth < 400) return 62;   // tiny phone
  if (window.innerWidth < 768) return 76;   // mobile
  if (window.innerWidth < 1024) return 88;  // tablet
  return 96;                                 // desktop
}

const ROTATIONS = [-10, 5, -4, 8, -6, 3, -7, 6, -2, 7, -5, 4, -9, 2];

function SpawnedCard({ id, src, top, left, rotation, size, onExpire }) {
  useEffect(() => {
    // Card lives 1.8-2.8s: shorter so more churn = denser feel
    const lifetime = 1800 + Math.random() * 1000;
    const t = setTimeout(() => onExpire(id), lifetime);
    return () => clearTimeout(t);
  }, [id, onExpire]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}     // start small
      animate={{ opacity: 1, scale: 1 }}        // grow to full size
      exit={{ opacity: 0, scale: 1.15, y: -8 }} // grow slightly then vanish
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        rotate: rotation,
        zIndex: 10,
        pointerEvents: 'none',
      }}
      className="will-change-transform"
    >
      <div
        style={{ borderRadius: '22%' }}
        className="w-full h-full overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function FloatingImages() {
  const [cards, setCards] = useState([]);
  const imgIdxRef = useRef(0);
  const zoneIdxRef = useRef(0);
  const usedZonesRef = useRef(new Set());

  const expireCard = useCallback((id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  }, []);

  const spawnCard = useCallback(() => {
    // Pick a zone not currently occupied to avoid stacking
    let zoneIdx;
    let attempts = 0;
    do {
      zoneIdx = (zoneIdxRef.current + Math.floor(Math.random() * 5)) % SPAWN_ZONES.length;
      attempts++;
    } while (usedZonesRef.current.has(zoneIdx) && attempts < 8);

    usedZonesRef.current.add(zoneIdx);
    setTimeout(() => usedZonesRef.current.delete(zoneIdx), 2500);
    zoneIdxRef.current = (zoneIdx + 1) % SPAWN_ZONES.length;

    const zone = SPAWN_ZONES[zoneIdx];
    const src = TECH_IMAGES[imgIdxRef.current % TECH_IMAGES.length];
    imgIdxRef.current += 1;

    const rotation = ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
    const size = getCardSize();

    setCards(prev => [
      ...prev.slice(-14), // keep up to 14 visible: dense coverage
      { id: Date.now() + Math.random(), src, top: zone.top, left: zone.left, rotation, size }
    ]);
  }, []);

  useEffect(() => {
    // Seed 6 cards immediately so screen isn't empty on load
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnCard, i * 120);
    }
    // Then spawn one every 600ms: fast enough to stay dense
    const interval = setInterval(spawnCard, 600);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {cards.map(card => (
          <SpawnedCard
            key={card.id}
            {...card}
            onExpire={expireCard}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
