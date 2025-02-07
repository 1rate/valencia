// // src/pages/HomePage.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import YandexMap from '../components/YandexMap';
// import HeroImage from '../assets/hero-image.webp';
// // Импорт Swiper и необходимых модулей
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// // Импорт стилей Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// function HomePage() {
//   const cakeImages = [
//     'cake1.webp',
//     'cake1.webp',
//     'cake1.webp',
//     'cake1.webp',
//     'cake1.webp',
//     // Добавьте больше изображений при необходимости
//   ];

//   return (
//     <motion.div
//       className="home-page"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Секция героя */}
//       <section className="relative bg-secondary">
//         <img src={HeroImage} alt="Торты Валенсия" className="w-full h-96 object-cover" />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
//           <h1 className="text-4xl md:text-6xl text-secondary font-bold mb-4 font-serif">
//             Добро пожаловать в "Валенсия"
//             {/* <div className="mt-8">
//             <img src={Logo} alt="Логотип Валенсия" className="mx-auto h-30" />
//           </div> */}
//           </h1>
//           <p className="text-lg md:text-2xl text-secondary mb-6 font-sans">
//             Самые вкусные торты для ваших особых моментов
//           </p>
//           <Link
//             to="/cakes"
//             className="bg-primary text-secondary px-6 py-3 rounded-full text-lg hover:bg-pink-700 transition duration-300 ease-in-out"
//           >
//             Заказать сейчас
//           </Link>
//         </div>
//       </section>

//       {/* Секция карусели */}
//       <section className="py-12 px-4 bg-white">
//         <h2 className="text-3xl font-bold text-primary mb-8 text-center font-serif">
//           Наши лучшие торты
//         </h2>
//         <div className="container mx-auto">
//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 5000, disableOnInteraction: false }}
//             loop={true}
//             breakpoints={{
//               640: {
//                 slidesPerView: 1,
//               },
//               768: {
//                 slidesPerView: 2,
//               },
//               1024: {
//                 slidesPerView: 3,
//               },
//             }}
//           >
//             {cakeImages.map((image, index) => (
//               <SwiperSlide key={index}>
//                 <div className="h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
//                   <img
//                     src={require(`../assets/images/${image}`)}
//                     alt={`Торт ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* Секция с картой */}
//       <section className="py-12 px-4 bg-gray-100">
//         <h2 className="text-3xl font-bold text-primary mb-8 text-center font-serif">
//           Наши магазины
//         </h2>
//         <div className="container mx-auto">
//           <YandexMap />
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// export default HomePage;

// src/pages/HomePage.js
// src/pages/HomePage.js
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

// Импорт иконок (потребуется установить библиотеку @fortawesome/react-fontawesome)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faVk } from '@fortawesome/free-brands-svg-icons';

function HomePage() {
  const cakeImages = [
    // Замените на реальные пути к вашим изображениям
    'cake1.webp',
    'cake2.webp',
    'cake3.webp',
    'cake3.webp',
    'cake3.webp',
  ];

  return (
    <motion.div
      className="home-page overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Секция героя */}
      <section className="relative bg-secondary h-screen overflow-hidden">
        <img src={HeroImage} alt="Торты Валенсия" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl text-white font-bold mb-4 font-serif"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Добро пожаловать в "Валенсия"
          </motion.h1>
          <motion.p
            className="text-xl md:text-3xl text-white mb-6 font-sans max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Самые вкусные торты для ваших особых моментов
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/cakes"
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-pink-700 transition duration-300 ease-in-out"
            >
              Заказать сейчас
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Секция популярных тортов */}
      <section className="py-12 px-4 bg-white">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center font-serif">
          Популярные торты
        </h2>
        <div className="container mx-auto">
          <Swiper
            className="overflow-hidden"
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
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={require(`../assets/images/${image}`)}
                    alt={`Торт ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Название торта {index + 1}</h3>
                    <p className="text-gray-700 mb-4">Краткое описание торта.</p>
                    <Link
                      to="/cakes"
                      className="inline-block bg-primary text-white px-4 py-2 rounded-full font-bold hover:bg-pink-700 transition duration-300 ease-in-out"
                    >
                      Узнать больше
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Секция "О нас" */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={require('../assets/hero-image.webp')}
              alt="О нас"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl font-bold text-primary mb-6 font-serif">
              О нас
            </h2>
            <p className="text-gray-700 text-lg mb-6 font-sans">
              Мы — команда профессиональных кондитеров, создающая шедевры для ваших особых событий. Наши торты — это сочетание качества, вкуса и красоты.
            </p>
            <Link
              to="/about"
              className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-pink-700 transition duration-300 ease-in-out"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </section>

      {/* Секция отзывов */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center font-serif">
          Отзывы клиентов
        </h2>
        <div className="container mx-auto">
          <Swiper
            className="overflow-hidden"
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            loop={true}
          >
            {/* Замените на реальные отзывы */}
            {[1, 2, 3].map((index) => (
              <SwiperSlide key={index}>
                <div className="max-w-xl mx-auto text-center">
                  <p className="text-xl text-gray-700 italic mb-4">
                    "Это был самый вкусный торт, который мы когда-либо пробовали! Спасибо 'Валенсия' за то, что сделали наш день особенным."
                  </p>
                  <h3 className="text-lg font-bold mb-8">Иван Иванов</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Секция с картой и контактами */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center font-serif">
          Наши магазины
        </h2>
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <YandexMap />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Свяжитесь с нами</h3>
            <p className="text-lg mb-4">
              Адрес: ул. Примерная, д. 123, Москва, Россия
            </p>
            <p className="text-lg mb-4">Телефон: +7 (123) 456-78-90</p>
            <p className="text-lg mb-4">Email: info@valensia.ru</p>
            <p className="text-lg">
              Режим работы: Пн-Вс 9:00 - 21:00
            </p>
          </div>
        </div>
      </section>

      {/* Секция подписки на новости */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif">
            Подпишитесь на наши новости
          </h2>
          <p className="text-lg text-white mb-8 font-sans">
            Получайте самые свежие новости и специальные предложения первыми!
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Ваш email"
              className="w-full p-3 rounded-full mb-4 sm:mb-0 sm:mr-4 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-primary px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Подписаться
            </button>
          </form>
        </div>
      </section>

      {/* Убираем дополнительный футер */}
    </motion.div>
  );
}

export default HomePage;


