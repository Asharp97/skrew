import { CardType } from '@prisma/client';

const cards = [
  ...Array.from({ length: 6 }, (_, i) => ({
    value: i + 1,
    type: CardType.LowNumber,
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    value: i + 6,
    type: CardType.HighSelf,
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    value: i + 8,
    type: CardType.HighOther,
  })),
  ...Array.from({ length: 4 }, () => ({
    value: 10,
    type: CardType.KhodWaHat,
  })),
  ...Array.from({ length: 2 }, () => ({
    value: 10,
    type: CardType.KaabDayer,
  })),
  ...Array.from({ length: 2 }, () => ({
    value: 10,
    type: CardType.Basra,
  })),
  ...Array.from({ length: 4 }, () => ({
    value: 20,
    type: CardType.Polar,
  })),
  ...Array.from({ length: 2 }, () => ({
    value: -1,
    type: CardType.Polar,
  })),
  ...Array.from({ length: 2 }, () => ({
    value: 25,
    type: CardType.Polar,
  })),
  ...Array.from({ length: 2 }, () => ({
    value: 0,
    type: CardType.Polar,
  })),
];

export default cards;
