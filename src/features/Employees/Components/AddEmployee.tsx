"use client";

import { addUser, getUser } from "@/lib/db/users";
import { User } from "@/lib/dbTypes";
import DefaultAppBar from "@/shared/components/AppBar/DefaultAppBar";
import Content from "@/shared/components/Content/Content";
import MainPane from "@/shared/components/MainPane/MainPane";
import { promiseCache } from "@/shared/hooks/useQuery";
import {
  ArrowLeft,
  Check,
  IdCard,
  KeyRound,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const generatePIN = () => {
  const randomPin = Math.floor(Math.random() * 900) + 100; // 100 - 999

  return randomPin;
};

const AddEmployee = () => {
  const { push } = useRouter();

  const addEmployee = async (_prevData: unknown, formData: FormData) => {
    const firstName = String(formData.get("firstName"));
    const lastName = String(formData.get("lastName"));
    const idn = String(formData.get("idn"));
    const pin = Number(formData.get("pin"));

    const newEmployee: User = {
      id: pin,
      firstName,
      lastName,
      role: "employee" as const,
      idn,
      state: "active",
    };

    addUser(newEmployee).then(() => {
      toast.success(`Added ${firstName}`, { className: "md:text-xl" });
      promiseCache.delete("employees");
      promiseCache.delete("employeesMap");
      push("/admin/employees");
    });
  };
  const [randomPin, setRandomPin] = useState(generatePIN());

  useEffect(() => {
    const checkPin = async () => {
      const user = await getUser(randomPin);

      if (user) setRandomPin(generatePIN());
    };

    checkPin();
  }, [randomPin]);

  const [_state, action, _isLoading] = useActionState(addEmployee, undefined);
  return (
    <MainPane>
      <DefaultAppBar
        pageTitle="Add Employee"
        pageDescription="Add a new employee to your team"
        url="/admin/employees"
      />
      <Content>
        <form
          action={action}
          className="grid grid-cols-2 gap-6 w-full justify-center items-center"
        >
          <label className="input md:input-lg input-bordered flex items-center gap-2">
            <UserIcon />
            <input
              autoFocus
              className="grow"
              type="text"
              required
              name="firstName"
              placeholder="First name"
              minLength={2}
              maxLength={30}
            />
          </label>
          <label className="input md:input-lg input-bordered flex items-center gap-2">
            <UserIcon />
            <input
              className="grow"
              type="text"
              required
              name="lastName"
              placeholder="Last name"
              minLength={2}
              maxLength={30}
            />
          </label>
          <label className="input md:input-lg input-bordered flex items-center gap-2">
            <IdCard />
            <input
              className="grow"
              type="text"
              required
              name="idn"
              placeholder="Identity Number"
              maxLength={15}
            />
          </label>
          <label className="input md:input-lg flex items-center gap-2">
            <KeyRound />
            <input
              readOnly
              type="number"
              name="pin"
              placeholder="Type here"
              className="input input-ghost w-full max-w-xs"
              value={randomPin}
            />
          </label>
          <div className="col-span-2"></div>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => push("/admin/employees")}
          >
            <ArrowLeft />
            Cancel
          </button>
          <button type="submit" className="btn bg-green-500 btn-lg text-white">
            <Check />
            Add
          </button>
        </form>
      </Content>
    </MainPane>
  );
};

export default AddEmployee;
