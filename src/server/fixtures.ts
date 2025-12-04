import { z } from "zod";

export type Role = "viewer" | "editor" | "admin";

export type User = {
  id: number;
  name: string;
  nickname: string;
  role: Role;
};

export const USER_LIST: User[] = [
  { id: 1, name: "Alice", nickname: "alice_01", role: "viewer" },
  { id: 2, name: "Bob", nickname: "bob_dev", role: "editor" },
  { id: 3, name: "Charlie", nickname: "charlie_admin", role: "admin" },
  { id: 4, name: "David", nickname: "david_user", role: "viewer" },
  { id: 5, name: "Eve", nickname: "eve_edit", role: "editor" },
  { id: 6, name: "Frank", nickname: "frank_boss", role: "admin" },
  { id: 7, name: "Grace", nickname: "grace_view", role: "viewer" },
  { id: 8, name: "Hannah", nickname: "hannah_editor", role: "editor" },
  { id: 9, name: "Isaac", nickname: "isaac_root", role: "admin" },
  { id: 10, name: "Jack", nickname: "jack_guest", role: "viewer" },
  { id: 11, name: "Kate", nickname: "kate_mod", role: "editor" },
  { id: 12, name: "Liam", nickname: "liam_chief", role: "admin" },
  { id: 13, name: "Mason", nickname: "mason_user", role: "viewer" },
  { id: 14, name: "Nathan", nickname: "nathan_writer", role: "editor" },
  { id: 15, name: "Noah", nickname: "noah_super", role: "admin" },
  { id: 16, name: "Olivia", nickname: "olivia_reader", role: "viewer" },
  { id: 17, name: "Patrick", nickname: "patrick_contrib", role: "editor" },
  { id: 18, name: "Quinn", nickname: "quinn_admin", role: "admin" },
  { id: 19, name: "Ryan", nickname: "ryan_basic", role: "viewer" },
  { id: 20, name: "Sophia", nickname: "sophia_author", role: "editor" },
  { id: 21, name: "Thomas", nickname: "thomas_master", role: "admin" },
  { id: 22, name: "Uma", nickname: "uma_visitor", role: "viewer" },
  { id: 23, name: "Victor", nickname: "victor_publisher", role: "editor" },
  { id: 24, name: "William", nickname: "william_owner", role: "admin" },
  { id: 25, name: "Xavier", nickname: "xavier_member", role: "viewer" },
  { id: 26, name: "Yvonne", nickname: "yvonne_mod", role: "editor" },
  { id: 27, name: "Zachary", nickname: "zachary_lead", role: "admin" },
];

export const roleEnum = z.enum(["admin", "viewer", "editor"]);
// export const permEnum = z.enum(['view', 'edit', 'admin']);

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  role: roleEnum,
  // permissions: z.array(permEnum),
});

export const userListSchema = z.array(userSchema);

export const getUserSuccessSchema = userSchema;
export const getUserListSuccessSchema = userListSchema;

export const userFormSchema = z.object({
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다"),
  role: roleEnum,
  // permissions: z.array(permEnum).optional(),
});
export const updateUserSuccessSchema = userFormSchema;
