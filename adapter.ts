import { trpc } from "@/lib/trpc";
import type { Adapter } from "@auth/core/adapters";

export const TrpcAdapter: Adapter = {
  createUser: (data) => {
    return trpc.adapter.createUser.mutate(data);
  },
  getUser: (id) => trpc.adapter.getUser.query({ id }),
  getUserByEmail: (email) => trpc.adapter.getUserByEmail.query({ email }),
  getUserByAccount: (provider_providerAccountId) =>
    trpc.adapter.getUserByAccount.query({ provider_providerAccountId }),
  updateUser: (data) => trpc.adapter.updateUser.mutate(data),
  deleteUser: (id) => trpc.adapter.deleteUser.mutate({ id }),
  linkAccount: (data) => trpc.adapter.linkAccount.mutate(data),
  unlinkAccount: (provider_providerAccountId) =>
    trpc.adapter.unlinkAccount.mutate(provider_providerAccountId),
  getSessionAndUser: (sessionToken) =>
    trpc.adapter.getSessionAndUser.query({ sessionToken }),
  createSession: (data) => trpc.adapter.createSession.mutate(data),
  updateSession: (data) => trpc.adapter.updateSession.mutate(data),
  deleteSession: (sessionToken) =>
    trpc.adapter.deleteSession.mutate({ sessionToken }),
  createVerificationToken: (data) =>
    trpc.adapter.createVerificationToken.mutate(data),
  useVerificationToken: (identifier_token) =>
    trpc.adapter.useVerificationToken.query(identifier_token),
  getAccount: (providerAccountId, provider) =>
    trpc.adapter.getAccount.query({ provider, providerAccountId }),
};
