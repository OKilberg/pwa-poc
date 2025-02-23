import CheckIn from "@/components/CheckIn/CheckIn";
import { getCurrentTime } from "@/util/util";

export default function Home() {
  const currentTime = getCurrentTime();
  return (
    <div className="px-6 flex justify-center">
      <div className="prose text-center flex flex-col gap-2 pt-6">
        <h2>{currentTime}</h2>
        Enter your personal code to check in or out
        <CheckIn />
      </div>
    </div>
  );
}
