'use client';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Courier_Prime } from 'next/font/google'

const typewriter = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function TypedLogo() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Hi, my name is Eliza Kishan.'], // Text to type
      typeSpeed: 200,
      backSpeed: 50,
      loop: false,
      cursorChar: '|',
    });

    // Cleanup on unmount
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className={typewriter.className}>
        <div className = "text-4xl">
            <span ref={el} />
        </div>
    </div>
  );
}
