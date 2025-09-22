'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

interface Suggestion {
  value: string;
  unrestricted_value: string;
}

export const CheckoutAddress: React.FC = () => {
  const [localInput, setLocalInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  
  const { setValue, formState: { errors }, trigger, register } = useFormContext();

  // Регистрируем поле, если оно ещё не зарегистрировано
  useEffect(() => {
    register('address');
  }, [register]);

  const fetchSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.post(
          'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
          {
            query: value,
            count: 5,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token 49abb6cb5d7367d73c49905fc60a3956a8720806',
            },
          }
        );

        setSuggestions(response.data.suggestions);
      } catch (error) {
        console.error('Ошибка получения подсказок:', error);
      }
    }, 400),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    setSelectedAddress(''); // обнуляем выбранный адрес при любом изменении
    setValue('address', '', { shouldValidate: true });
    fetchSuggestions(value);
  };

  const handleSelect = (value: string) => {
    setLocalInput(value);
    setSelectedAddress(value);
    setValue('address', value, { shouldValidate: true });
    setSuggestions([]);
    trigger('address'); // для немедленной валидации
  };

  // Если пользователь не выбрал подсказку, чистим поле перед отправкой
  useEffect(() => {
    if (!selectedAddress) {
      setValue('address', '', { shouldValidate: true });
    }
  }, [selectedAddress, setValue]);

  return (
    <div className="relative w-full">
      <Input
        className="text-base"
        placeholder="Введите адрес"
        autoComplete="off"
        value={localInput}
        onChange={handleChange}
        onBlur={() => {
          setIsTouched(true);
          // Задержка позволяет отработать клику на подсказке до очистки
          setTimeout(() => {
            setSuggestions([]);
          }, 150);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white shadow-md rounded border border-gray-300 w-full mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSelect(suggestion.value)}
            >
              {suggestion.value}
            </li>
          ))}
        </ul>
      )}
      {errors.address && isTouched && (
        <p className="text-red-500 mt-2 text-sm">
          Выберите адрес из предложенных подсказок
        </p>
      )}
    </div>
  );
};
