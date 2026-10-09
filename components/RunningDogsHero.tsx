'use client';

import { useEffect, useState } from 'react';

interface Dog {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  emoji: string;
  size: number;
}

export function RunningDogsHero() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    // Initialize dogs
    const initialDogs: Dog[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70 + 15,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 0.5,
      emoji: ['🐕', '🐶', '🦮', '🐩'][Math.floor(Math.random() * 4)],
      size: Math.random() * 2 + 2,
    }));

    setDogs(initialDogs);

    // Animation loop
    const interval = setInterval(() => {
      setDogs(prevDogs =>
        prevDogs.map(dog => {
          let newX = dog.x + dog.vx;
          let newY = dog.y + dog.vy;
          let newVx = dog.vx;
          let newVy = dog.vy;

          // Bounce off walls
          if (newX < 0 || newX > 100) {
            newVx = -dog.vx;
            newX = Math.max(0, Math.min(100, newX));
          }

          if (newY < 15 || newY > 85) {
            newVy = -dog.vy;
            newY = Math.max(15, Math.min(85, newY));
          }

          // Random direction changes
          if (Math.random() < 0.02) {
            newVx = (Math.random() - 0.5) * 2;
            newVy = (Math.random() - 0.5) * 0.5;
          }

          return {
            ...dog,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 via-sky-50 to-amber-50 rounded-2xl overflow-hidden border-2 border-slate-200">
      {/* Grass line */}
      <div className="absolute bottom-20 w-full h-1 bg-green-400"></div>

      {/* Running dogs */}
      {dogs.map(dog => (
        <div
          key={dog.id}
          className="absolute transition-none select-none pointer-events-none animate-bounce"
          style={{
            left: `${dog.x}%`,
            top: `${dog.y}%`,
            fontSize: `${dog.size}rem`,
            transform: `translateX(-50%) ${dog.vx < 0 ? 'scaleX(-1)' : 'scaleX(1)'}`,
            animation: 'none',
          }}
        >
          {dog.emoji}
        </div>
      ))}

      {/* Decorative clouds */}
      <div className="absolute top-8 left-10 text-4xl opacity-50">☁️</div>
      <div className="absolute top-12 right-20 text-5xl opacity-40">☁️</div>
      <div className="absolute top-24 left-1/3 text-3xl opacity-50">☁️</div>

      {/* Sun */}
      <div className="absolute top-4 right-8 text-6xl">☀️</div>
    </div>
  );
}
