import { useEffect, useRef } from 'react';
import s from './Cursor.module.css';

const Cursor = () => {
  const curRef = useRef(null);
  useEffect(() => {
    const cursor = curRef.current;

    const handleMouseMove = e => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.display = 'block';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.display = 'none';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('focus', () => {
      cursor.style.cursor = 'none';
    });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('focus', () => {
        cursor.style.cursor = 'none';
      });
    };
  }, []);
  return <div className={s.pos} ref={curRef}></div>;
};

export default Cursor;
