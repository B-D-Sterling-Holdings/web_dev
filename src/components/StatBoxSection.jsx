'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './StatBox.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Performance Since Inception*', value: 76.51, suffix: '%', decimals: 2 },
  { label: 'Holdings in Portfolio', value: 10, suffix: '', decimals: 0 },
  { label: 'Days Since Inception', value: 439, suffix: '', decimals: 0 },
];

function StatBox({ label, value, prefix = '', suffix = '', decimals = 0, index }) {
  const boxRef = useRef(null);
  const [display, setDisplay] = useState('0');
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          onEnter: () => {
            if (hasStarted.current) return;
            hasStarted.current = true;

            const obj = { v: 0 };

            gsap.to(obj, {
              v: value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                const n = obj.v;

                // format number for display
                const formatted =
                  decimals > 0
                    ? n.toFixed(decimals)
                    : Math.floor(n).toString();

                // add commas while preserving decimals
                const withCommas =
                  decimals > 0
                    ? Number(formatted).toLocaleString(undefined, {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                      })
                    : Number(formatted).toLocaleString();

                setDisplay(withCommas);
              },
            });
          },
        },
      }
    );
  }, [value, decimals]);

  const offset = (index * (5 / stats.length)).toFixed(2);
  const delay = `-${offset}s`;

  return (
    <div ref={boxRef} className={styles.statBox}>
      <div className={styles.statValue}>
        <span className={styles.glowOutline} style={{ animationDelay: delay }}>
          {prefix}{display}{suffix}
        </span>
        <span className={styles.glowText} style={{ animationDelay: delay }}>
          {prefix}{display}{suffix}
        </span>
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function StatBoxSection() {
  return (
    <div className={styles.statContainer}>
      {stats.map((s, i) => (
        <StatBox
          key={i}
          index={i}
          label={s.label}
          value={s.value}
          prefix={s.prefix || ''}
          suffix={s.suffix || ''}
          decimals={s.decimals ?? 0}
        />
      ))}
    </div>
  );
}
