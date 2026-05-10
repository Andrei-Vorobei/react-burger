import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  parseISO,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatRelativeDate = (isoString: string): string => {
  const date = parseISO(isoString);

  const distance = formatDistanceToNow(date, {
    addSuffix: false,
    locale: ru,
  });

  const now = new Date();
  const diffDays: number = differenceInCalendarDays(now, date);

  let dateStr;
  if (diffDays === 0) {
    dateStr = 'Сегодня';
  } else if (diffDays === 1) {
    dateStr = 'Вчера';
  } else {
    dateStr = `${distance} назад`;
  }

  const timeStr: string = format(date, 'HH:mm', { locale: ru });

  return `${dateStr}, ${timeStr}`;
};
