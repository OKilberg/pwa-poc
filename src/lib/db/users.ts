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

export const setUserState = async (id: User["id"], state: User["state"]) => {
  const updates = {
    state,
  };

  const response = await tryFetch(() => db.users.update(id, { ...updates }));

  return response;
};

export const getEmployees = async () => {
  const response = await tryFetch(() =>
    db.users.where("role").equals("employee").toArray()
  );

  if (!response) {
    return [];
  }

  return response;
};

export const getActiveEmployees = async () => {
  const response = await tryFetch(() =>
    db.users.where({ role: "employee", state: "active" }).toArray()
  );

  if (!response) {
    return [];
  }

  return response;
};

export const getAdmins = async () => {
  const response = await tryFetch(() =>
    db.users.where("role").equals("admin").toArray()
  );

  if (!response) {
    return 0;
  }

  return response.length;
};

export const getEmployeesMap = async () => {
  const response = await tryFetch(() =>
    db.users.where("role").equals("employee").toArray()
  );

  if (!response) {
    return new Map<number, User>();
  }

  const employeeMap = new Map<number, User>(
    response.map((employee) => [employee.id, employee])
  );

  return employeeMap;
};

export const getActiveEmployeesMap = async () => {
  const response = await tryFetch(() =>
    db.users.where({ role: "employee", state: "active" }).toArray()
  );

  if (!response) {
    return new Map<number, User>();
  }

  const employeeMap = new Map<number, User>(
    response.map((employee) => [employee.id, employee])
  );

  return employeeMap;
};
