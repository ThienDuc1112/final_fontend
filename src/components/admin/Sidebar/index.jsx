import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { IoBriefcase } from "react-icons/io5";
import { FaLanguage } from "react-icons/fa6";
import TokenService from "@/utils/Token.service";

const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    TokenService.removeUser();
  }

  return (
    <div
      className={`absolute left-0 top-0 text-white z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear lg:fixed lg:translate-x-0
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear pt-[100px]">
        {/* <!-- Sidebar Menu --> */}
        <div className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-lg font-semibold text-white">
              Admin Menu
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <Link
                  href="/admin/businessReview"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-slate-500 ${
                    pathname.includes("businessReview") && "bg-slate-500"
                  }`}
                >
                  <VscPreview size={18} />
                  Reviewing Business
                </Link>
              </li>
              {/* <!-- Menu Item Profile --> */}

              <li>
                <Link
                  href="/admin/manageCareer"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-slate-600 ${
                    pathname.includes("manageCareer") && "bg-slate-600"
                  }`}
                >
                  <IoBriefcase size={18} />
                  Career Management
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/manageSkill"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-slate-600 ${
                    pathname.includes("manageSkill") && "bg-slate-600"
                  }`}
                >
                  <HiWrenchScrewdriver size={18} />
                  Skill Management
                </Link>
              </li>

              {/* <!-- Menu Item Tables --> */}

              <li>
                <Link
                  href="/admin/manageLanguage"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-slate-600 ${
                    pathname.includes("manageLanguage") && "bg-slate-600"
                  }`}
                >
                  <FaLanguage size={18} />
                  Language Manage
                </Link>
              </li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-lg font-semibold text-white">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                 onClick={() => handleLogout()}
                  href="/auth/login"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-slate-600 ${
                    pathname.includes("logout") && "bg-slate-600"
                  }`}
                >
                  <MdLogout size={18} style={{ transform: "rotate(180deg)" }} />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </div>
  );
};

export default Sidebar;
