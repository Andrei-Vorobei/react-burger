type TBunTypes = 'top' | 'bottom';

type TBurgerConstructor = {
  text: string;
  thumbnail: string;
  price: number;
  isLocked: boolean;
  type?: TBunTypes;
  id: number;
};

export const burgerConstructor: TBurgerConstructor[] = [
  {
    text: 'Краторная булка N-200i (верх)',
    thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png',
    price: 20,
    isLocked: true,
    type: 'top',
    id: 1,
  },
  {
    text: 'Соус традиционный галактический',
    thumbnail: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    price: 30,
    isLocked: false,
    id: 2,
  },
  {
    text: 'Мясо бессмертных моллюсков Protostomia',
    thumbnail: 'https://code.s3.yandex.net/react/code/meat-02.png',
    price: 300,
    isLocked: false,
    id: 3,
  },
  {
    text: 'Плоды Фалленианского дерева',
    thumbnail: 'https://code.s3.yandex.net/react/code/sp_1.png',
    price: 80,
    isLocked: false,
    id: 4,
  },
  {
    text: 'Хрустящие минеральные кольца',
    thumbnail: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    price: 80,
    isLocked: false,
    id: 5,
  },
  {
    text: 'Хрустящие минеральные кольца',
    thumbnail: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    price: 80,
    isLocked: false,
    id: 6,
  },
  {
    text: 'Краторная булка N-200i (низ)',
    thumbnail: 'https://code.s3.yandex.net/react/code/bun-02.png',
    price: 20,
    isLocked: true,
    type: 'bottom',
    id: 7,
  },
];
