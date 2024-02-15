import { Movie } from '../../types/movie';

export function convertDateStringToObject(
  dateString: string
): { year: number; month: number; day: number } | null {
  const parts = dateString.split('-');

  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return { year, month, day };
    }
  }

  return null;
}

export function idIsNotRepited(array: Movie[], idToCheck: string): boolean {
  return array.some((movie) => movie.id === idToCheck);
}
