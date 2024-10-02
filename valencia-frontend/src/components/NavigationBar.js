// src/components/NavigationBar.js

import React from 'react';

function NavigationBar({ categories, currentCategory, scrollToCategory }) {
  return (
    <nav className="sticky top-[48px] bg-white z-40 shadow-sm">
      <div className="container mx-auto flex overflow-x-auto px-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={`whitespace-nowrap px-3 py-2 ${
              currentCategory === category
                ? 'text-white bg-primary'
                : 'text-gray-700 hover:text-primary'
            } text-sm font-semibold`}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default NavigationBar;
