// src/components/NavigationBar.js

import React, { useMemo } from 'react';

const NavigationBar = React.memo(
  ({ categories, currentCategory, scrollToCategory }) => {
    // Мемоизируем кнопки категорий
    const categoryButtons = useMemo(() => {
      return categories.map((category) => {
        const isActive = currentCategory === category;
        const buttonClasses = `whitespace-nowrap px-3 py-2 ${
          isActive ? 'text-white bg-primary' : 'text-gray-700 hover:text-primary'
        } text-sm font-semibold`;

        return (
          <button
            key={category}
            onClick={() => scrollToCategory(category)}
            className={buttonClasses}
            aria-current={isActive ? 'page' : undefined}
          >
            {category}
          </button>
        );
      });
    }, [categories, currentCategory, scrollToCategory]);

    return (
      <nav className="sticky top-0 bg-white z-40 shadow-sm mb-0">
        <div className="container mx-auto flex overflow-x-auto px-4 space-x-4">
          {categoryButtons}
        </div>
      </nav>
    );
  }
);

export default NavigationBar;
