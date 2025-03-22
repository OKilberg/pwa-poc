"use client";

import { promiseCache } from "@/features/Home/Components/useQuery";
import { addUser, getUser } from "@/lib/db/users";
import { startUserSession } from "@/lib/session/Session";
import Button from "@/shared/components/Button/Button";
import { Check, IdCard, KeyRound, User as UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

const generatePIN = () => {
  const randomPin = Math.floor(Math.random() * 900) + 100; // 100 - 999

  return randomPin;
};

const AddAdminForm = () => {
  const addAdmin = async (_prevData: unknown, formData: FormData) => {
    const firstName = String(formData.get("firstName"));
    const lastName = String(formData.get("lastName"));
    const idn = String(formData.get("idn"));
    const pin = Number(formData.get("pin"));

    console.log(firstName, lastName, pin);

    const newAdmin = {
      id: pin,
      firstName,
      lastName,
      role: "admin" as const,
      idn
    };

    addUser(newAdmin).then(() => {
      toast.success(`Added ${firstName}`, { className: "md:text-xl" });
      promiseCache.delete("employees");
      promiseCache.delete("admins");
      promiseCache.delete("employeesMap");
      startUserSession({ ...newAdmin, isClockedIn: false });
      redirect("/admin");
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

  const [_state, action, _isLoading] = useActionState(addAdmin, undefined);
  return (
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
                minLength={9}
                maxLength={9}
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
        <Button type="submit" className="" variant="primary">
          <Check />
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddAdminForm;
