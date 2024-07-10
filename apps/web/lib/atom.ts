import type { PostResolved } from "@semicolon/api/schema";
import { atom } from "jotai";

export const myPostsAtom = atom<PostResolved[]>([]);
