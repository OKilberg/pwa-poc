import CheckIn from "@/components/CheckIn";

export default function Home() {
  return (
    <div className="px-6 flex justify-center">
      <div className="text-center flex flex-col gap-2 pt-6">
        Welcome, please enter your personal code to check-in for the day!
        <CheckIn />
      </div>
    </div>
  );
}
