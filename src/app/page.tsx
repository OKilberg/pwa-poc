import CheckIn from "@/components/CheckIn/CheckIn";
import { getCurrentTime } from "@/util/util";
import { Clock4 } from "lucide-react";

export default function Home() {
  const currentTime = getCurrentTime();
  return (
    <div className="px-6 flex flex-col justify-center bg-tresLight py-4 font-publicSans rounded-md">
      <div className="flex flex-col items-center gap-1">
        <div className="bg-tresYellow rounded-full p-2">
          <Clock4 />
        </div>
        <h2 className="text-2xl font-semibold">{currentTime}</h2>
        <h3 className="text-lg font-light">Tuesday, 25 February</h3>
      </div>
      <div className="text-center flex flex-col gap-2 pt-6">
        <h2 className="text-lg font-semibold">Enter your personal code</h2>
        <h3 className="text-sm font-light">
          Your three digit personal code is used to check in and out
        </h3>
        <CheckIn />
      </div>
    </div>
  );
}
