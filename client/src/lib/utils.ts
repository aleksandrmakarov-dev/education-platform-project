import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}

export const getId = () => {
  return Math.round(Math.random() * 1000000);
};

// Fisher Yates Shuffle
export function shuffle<T>(array: T[]) {
  let a = [...array],
    m = a.length,
    i;
  while (m) {
    i = ~~(Math.random() * m--);
    [a[m], a[i]] = [a[i], a[m]];
  }
  return a;
}
