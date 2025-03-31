import { atom } from "jotai";

export const authAtom = atom<{ user: any; token: string | null }>({
  user: null,
  token: null,
});
