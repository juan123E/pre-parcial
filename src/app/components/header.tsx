import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Route {
  name: string;
  path: string;
}

const Header = ({ routes }: { routes: Route[] }) => {
  return (
    <header className="bg-yellow-300 text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="Logo de SeneTime"
            width={40}
            height={40}
          />
          <span className="text-2xl font-semibold">SeneTime</span>
        </Link>
        <nav>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="px-3 hover:text-gray-300"
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;