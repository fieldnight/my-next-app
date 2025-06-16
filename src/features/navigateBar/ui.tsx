"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigateBar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "메인", href: "/" },
    { label: "산불 뉴스", href: "/news" },
    { label: "자원봉사 플로깅", href: "/community" },
    { label: "로그인", href: "/login" },
  ];

  return (
    <div className="flex justify-center items-center max-w-xl text-xl">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded transition 
                  ${isActive ? "text-black font-semibold" : "text-green-900"}
                  hover:text-green-500 `}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
