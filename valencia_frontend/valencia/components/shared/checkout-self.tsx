import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useFormContext } from 'react-hook-form';

const pickupAddresses = [
  "	​Пермская 7", "ул. Докучаева 50б", "ул. Докучаева 42Б (у ТЦ Времена Года)", "ул. Хабаровская, 135", "ул. Ушакова 59/1",
  "ул. Автозаводская, 44", "ул. Пожарского, 10", "ул. Тургенева 21а", "ул. Молдавская, 4", "ул. Гашкова, 23а",
  "ул. Советская 2а (Лобаново)", "ул. Академика Веденеева, 39", "ул. Маршала Рыбалко, 99б",
  "ул. Александра Щербакова, 43а", "ул. Вильямса, 47Б", "ул. Запорожская, 11", "ул. Грачева ,25",
  "ул. Гусарова, 14Б", "ул. Солдатова , 32", "ул. Ким, 81", "ул. Ласьвинская, 38",
  "ул. Целинная, 41", "ул. Черняховского, 76", "ул. Калинина, 34",
];

export const CheckoutAddressPickup = () => {
    const { setValue, formState: { errors } } = useFormContext();

  return (
    <div className="w-full">
      <Select onValueChange={(val) => setValue('address', val, { shouldValidate: true })}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите пункт самовывоза" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
          {pickupAddresses.map((address, idx) => (
            <SelectItem key={idx} value={address}>{address}</SelectItem>
          ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.address && (
        <p className="text-red-500 mt-1 text-sm">{errors.address.message?.toString()}</p>
      )}
      
    </div>
  );
};
