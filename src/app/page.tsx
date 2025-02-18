import CheckIn from "@/components/CheckIn";

export default function Home() {
  return (
    <div className="px-6 flex justify-center">
      <div className="text-center flex flex-col gap-2">
        Welcome to my PWA
        <CheckIn />
      </div>
    </div>
  );
}
