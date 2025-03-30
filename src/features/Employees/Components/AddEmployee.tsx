"use client";

import { promiseCache } from "@/features/Home/Components/useQuery";
import { addUser, getUser } from "@/lib/db/users";
import { User } from "@/lib/dbTypes";
import Button from "@/shared/components/Button/Button";
import Content from "@/shared/components/Content/Content";
import Header from "@/shared/components/Header/Header";
import HeaderTitle from "@/shared/components/Header/Subcomponents/HeaderTitle";
import MainPane from "@/shared/components/MainPane/MainPane";
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

const generatePIN = () => {
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

    console.log(firstName, lastName, pin);

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

      console.log("user", user);

      if (user) setRandomPin(generatePIN());
    };

    checkPin();
  }, [randomPin]);

  const [_state, action, _isLoading] = useActionState(addEmployee, undefined);
  return (
    <MainPane>
      <Header>
        <HeaderTitle>Add New Employee</HeaderTitle>
      </Header>
      <Content>
        <form
          action={action}
          className="flex flex-col gap-6 w-full justify-center items-center"
        >
          <div className="flex flex-col gap-4 w-2/3">
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
          </div>

          <div className="flex w-full justify-center gap-4">
            <Button
              className="w-1/3"
              variant="tertiary"
              onClick={() => push("/admin/employees")}
            >
              <ArrowLeft />
              Cancel
            </Button>
            <Button type="submit" className="w-1/3" variant="primary">
              <Check />
              Add
            </Button>
          </div>
        </form>
      </Content>
    </MainPane>
  );
};

export default AddEmployee;
