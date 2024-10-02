// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import YandexMap from '../components/YandexMap';
import HeroImage from '../assets/hero-image.webp';
// Импорт Swiper и необходимых модулей
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HomePage() {
  const cakeImages = [
    'cake1.webp',
    'cake1.webp',
    'cake1.webp',
    'cake1.webp',
    'cake1.webp',
    // Добавьте больше изображений при необходимости
  ];

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Секция героя */}
      <section className="relative bg-secondary">
        <img src={HeroImage} alt="Торты Валенсия" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl text-secondary font-bold mb-4 font-serif">
            Добро пожаловать в "Валенсия"
            {/* <div className="mt-8">
            <img src={Logo} alt="Логотип Валенсия" className="mx-auto h-30" />
          </div> */}
          </h1>
          <p className="text-lg md:text-2xl text-secondary mb-6 font-sans">
            Самые вкусные торты для ваших особых моментов
          </p>
          <Link
            to="/cakes"
            className="bg-primary text-secondary px-6 py-3 rounded-full text-lg hover:bg-pink-700 transition duration-300 ease-in-out"
          >
            Заказать сейчас
          </Link>
        </div>
      </section>

      {/* Секция карусели */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center font-serif">
          Наши лучшие торты
        </h2>
        <div className="container mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {cakeImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={require(`../assets/images/${image}`)}
                    alt={`Торт ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Секция с картой */}
      <section className="py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center font-serif">
          Наши магазины
        </h2>
        <div className="container mx-auto">
          <YandexMap />
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;
