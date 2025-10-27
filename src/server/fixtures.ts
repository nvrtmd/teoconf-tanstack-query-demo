import { z } from "zod";

export type Role = "viewer" | "editor" | "admin";

export type User = {
  id: number;
  name: string;
  role: Role;
};

export const USER_LIST: User[] = [
  { id: 1, name: "Alice", role: "viewer" },
  { id: 2, name: "Bob", role: "editor" },
  { id: 3, name: "Charlie", role: "admin" },
  { id: 4, name: "David", role: "viewer" },
  { id: 5, name: "Eve", role: "editor" },
  { id: 6, name: "Frank", role: "admin" },
  { id: 7, name: "Grace", role: "viewer" },
  { id: 8, name: "Hannah", role: "editor" },
  { id: 9, name: "Isaac", role: "admin" },
  { id: 10, name: "Jack", role: "viewer" },
  { id: 11, name: "Kate", role: "editor" },
  { id: 12, name: "Liam", role: "admin" },
  { id: 13, name: "Mason", role: "viewer" },
  { id: 14, name: "Nathan", role: "editor" },
  { id: 15, name: "Noah", role: "admin" },
  { id: 16, name: "Olivia", role: "viewer" },
  { id: 17, name: "Patrick", role: "editor" },
  { id: 18, name: "Quinn", role: "admin" },
  { id: 19, name: "Ryan", role: "viewer" },
  { id: 20, name: "Sophia", role: "editor" },
  { id: 21, name: "Thomas", role: "admin" },
  { id: 22, name: "Uma", role: "viewer" },
  { id: 23, name: "Victor", role: "editor" },
  { id: 24, name: "William", role: "admin" },
  { id: 25, name: "Xavier", role: "viewer" },
  { id: 26, name: "Yvonne", role: "editor" },
  { id: 27, name: "Zachary", role: "admin" },
];

export const roleEnum = z.enum(["admin", "viewer", "editor"]);
// export const permEnum = z.enum(['view', 'edit', 'admin']);

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: roleEnum,
  // permissions: z.array(permEnum),
});

export const userListSchema = z.array(userSchema);

export const getUserSuccessSchema = userSchema;
export const getUserListSuccessSchema = userListSchema;

export const userFormSchema = z.object({
  name: z.string(),
  role: roleEnum,
  // permissions: z.array(permEnum).optional(),
});
export const updateUserSuccessSchema = userFormSchema;
