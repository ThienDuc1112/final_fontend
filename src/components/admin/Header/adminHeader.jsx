import { IoMenu } from "react-icons/io5";
import Image from "next/image";
const Header = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white max-h-[230px] pl-[240px] bg-gray-300/50 z-[3]">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <IoMenu size={26} color="#4b5563" className="cursor-pointer" />
        <div className="flex justify-start items-center gap-4">
          <Image
            src="/images/admin.jpg"
            width={60}
            height={50}
            alt="avatar"
            className="rounded-full"
          />
          <h3>Welcome Admin</h3>
        </div>
      </div>
    </header>
  );
};
export default Header;
