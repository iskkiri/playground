import { atom } from 'jotai';

export const mswAtom = atom<boolean>(false);

mswAtom.debugLabel = 'mswAtom';
