import Link from "next/link";
import { Resource } from "sst";

export default function Home() {
  // console.log(Resource.PayloadDatabase);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Navigate to /admin */}
        <Link href="/admin">Admin</Link>
      </main>
    </div>
  );
}
