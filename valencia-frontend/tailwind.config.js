// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Пути к вашим файлам
  ],
  theme: {
    extend: {
      colors: {
        primary: '#db8f8f',      // Ярко-синий
        secondary: '#F5F7FA',    // Светло-серый
        accent: '#50E3C2',       // Бирюзовый
        text: '#333333',         // Темно-серый
        background: '#FFFFFF',   // Белый
      },
      fonts: {
        heading: '"Montserrat", sans-serif',  // Шрифт для заголовков
        body: '"Open Sans", sans-serif',      // Шрифт для основного текста
      },
    },
  },
  plugins: [],
};
