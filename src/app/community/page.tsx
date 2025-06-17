import { CommunityList, NavigateBar } from "@/features";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center  my-10 h-screen">
      <main className="pt-10 w-[70%]  border rounded-2xl shadow-md bg-gradient-green  ">
        <div className="flex flex-row justify-between items-center p-4">
          <div>새빛산으로</div>
          <NavigateBar />
        </div>
        <main className="  border rounded-2xl  bg-white p-10">
          <h1 className="text-2xl font-bold mb-4">자원봉사 플로깅</h1>
          <CommunityList />
        </main>
      </main>
    </div>
  );
}
