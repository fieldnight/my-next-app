"use client";
import { usePathname } from "next/navigation";

export default function NavigateBar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "메인", href: "/" },
    { label: "산불 뉴스", href: "/news" },
    { label: "자원봉사 플로깅", href: "/community" },
    { label: "로그인", href: "/signUp" },
  ];

  return (
    <div className="flex justify-center items-center max-w-xl text-xl">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <button
            key={item.href}
            onClick={() => (window.location.href = item.href)} // ✅ 페이지 강제 새로고침 이동
            className={`px-4 py-2 rounded transition cursor-pointer
              ${isActive ? "text-black font-semibold" : "text-green-900"}
              hover:text-green-500`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
