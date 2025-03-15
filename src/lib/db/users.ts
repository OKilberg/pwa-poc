import { db } from "@/app/db";
import { tryFetch } from "@/util/util";
import { User } from "@/lib/dbTypes";

export const addUser = async (user: User) => {
  const response = await tryFetch(() => db.users.add(user));

  return response;
};

export const getUsers = async () => {
  const response = await tryFetch(() => db.users.toArray());

  if (!response) {
    return [];
  }

  return response;
};

export const getUser = async (id: User["id"]) => {
  const response = await tryFetch(() => db.users.get(id));

  return response;
};

export const editUser = async (id: User["id"], updates: Partial<User>) => {
  const response = await tryFetch(() => db.users.update(id, { ...updates }));

  return response;
};

export const getEmployeesMap = async () => {
  const response = await tryFetch(() =>
    db.users.where("role").equals("employee").toArray()
  );

  if (!response) {
    return new Map();
  }

  const employeeMap = new Map(
    response.map((employee) => [employee.id, employee])
  );

  return employeeMap;
};
