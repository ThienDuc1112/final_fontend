"use client";
import Link from "next/link";
import styles from "./header.module.css"; // Import CSS module
import Image from "next/image";
import { usePathname } from "next/navigation";
const Header = () => {
  const pathName = usePathname();

  return (
    <header className="py-3 w-full bg-header fixed z-10 pb-9">
      <div className="mx-auto px-4 lg:max-w-screen-2xl">
        <div className="flex items-center">
          {/* left */}
          <div className="flex items-center">
            <Link href="/" className="flex justify-center items-center gap-1">
              <Image
                src="/images/logonobg.png"
                width={75}
                height={80}
                alt="logo"
              />
              <h1 className="font-bold text-3xl">JobBox</h1>
            </Link>
          </div>
          {/* center */}
          <div className="inline-block w-full text-center">
            <nav className="inline-block w-auto p-0 text-left">
              <ul className="flex">
                <li className="float-left p-2.5 md:p-5">
                  <Link
                    href="/Home"
                    className={`font-normal leading-normal block text-lg ${
                      pathName == "/Home" ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li className="float-left p-2.5 md:p-5">
                  <Link
                    href="/jobs"
                    className={`font-normal leading-normal block text-lg ${
                      pathName == "/jobs" ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    Find Job
                  </Link>
                </li>
                <li className="float-left p-2.5 md:p-5">
                  <Link
                    href="/"
                    className={`font-normal leading-normal block text-lg ${
                      pathName == "/companies"
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                    onClick={() => handleComponentClick(e, "com")}
                  >
                    Companies
                  </Link>
                </li>
                <li className="float-left p-2.5 md:p-5">
                  <Link
                    href="/"
                    className={`font-normal leading-normal block text-lg ${
                      pathName === "/assistant"
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    Assistant
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* right */}
          <div className="flex items-center gap-5 min-w-64 text-right">
            <a
              className="font-normal font-medium text-lg leading-6 relative inline-block underline hover:text-blue-btn"
              href="/auth/register"
            >
              register
            </a>
            <a
              href="/auth/login"
              className="text-white bg-blue-btn px-4 py-2.5 leading-6 align-middle cursor-pointer rounded-md hover:bg-skyblue"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
