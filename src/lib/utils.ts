import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDuration, intervalToDuration } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSeconds = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  return formatDuration(duration, {
    format: ['hours', 'minutes', 'seconds'],
    zero: false,
    delimiter: ':',
    locale: {
      formatDistance: (_token, count) => String(count).padStart(2, '0'),
    },
  });
};
