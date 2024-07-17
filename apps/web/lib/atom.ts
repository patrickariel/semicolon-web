import type { PostResolved } from "@semicolon/api/schema";
import { atomWithImmer } from "jotai-immer";

export const myPostsAtom = atomWithImmer<PostResolved[]>([]);
export const followsAtom = atomWithImmer<Record<string, boolean>>({});
