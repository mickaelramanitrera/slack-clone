export type AvailableColors =
  | 'primary'
  | 'neutral'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

const availableColors: AvailableColors[] = [
  'primary',
  'neutral',
  'danger',
  'info',
  'success',
  'warning'
];

export const getRandomListItemColor =
  (): AvailableColors => {
    const randomIndex =
      Math.floor(
        Math.random() *
          (availableColors.length - 0 + 1)
      ) + 0;

    return availableColors[randomIndex];
  };
