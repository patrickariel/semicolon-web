import type { PostResolved } from "@semicolon/api/schema";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const myPostsAtom = atom<PostResolved[]>([]);
export const followsAtom = atomWithImmer<Record<string, boolean>>({});
