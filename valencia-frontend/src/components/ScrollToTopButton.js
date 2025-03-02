import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = throttle(() => {
    setVisible(window.scrollY > 300);
  }, 100);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full hover:bg-accent transition duration-300 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;