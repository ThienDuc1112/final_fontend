import { IoIosNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineDown } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import TokenService from "@/utils/Token.service";

const Dropdown = () => {
  const handleSignOut = () => {
    TokenService.removeUser();
  };

  return (
    <div className="flex items-center justify-start gap-[15px]">
      <div className="p-3 rounded-lg hover:bg-gray-300">
        <IoIosNotifications size={24} />
      </div>
      <div className="dropdown-container">
        <div className="p-3 rounded-lg hover:bg-gray-200 flex items-center gap-3 rotate-icon">
          <FaCircleUser size={22} />
          <span>Nguyen Duc Thien</span>
          <AiOutlineDown size={22} className="my-icon" />
        </div>
        <div className="dropdown-list z-30 w-[240px] shadow-lg">
          <a className="hover-item" href="#">
            <div className="px-2 py-3 flex items-center justify-start gap-2">
              <div className="p-1 bg-gray-200 rounded-sm change-item">
                <TbReportSearch size={22} className="change-icon" />
              </div>
              <span className="change-text">Manage Applications</span>
            </div>
          </a>
          <a className="hover-item" href="#">
            <div className="px-2 py-3 flex items-center justify-start gap-2">
              <div className="p-1 bg-gray-200 rounded-sm change-item">
                <FaRegFileLines size={22} className="change-icon" />
              </div>
              <span className="change-text">Manage Resumes</span>
            </div>
          </a>
          <a className="hover-item" href="/auth/login" onClick={handleSignOut}>
            <div className="px-2 py-3 flex items-center justify-start gap-2">
              <div className="p-1 bg-gray-200 rounded-sm change-item">
                <PiSignOutBold size={22} className="change-icon" />
              </div>
              <span className="change-text">Sign Out</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;