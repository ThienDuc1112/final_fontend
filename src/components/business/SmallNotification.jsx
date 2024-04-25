import Link from "next/link";
import { MdMailOutline } from "react-icons/md";

export default function SmallNotification({ data }) {
  return (
    <div className="rounded-sm border border-gray-200 bg-white px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1 min-w-[500px]">
      <div className="max-w-full overflow-x-auto px-3">
        <div className="flex justify-between items-center">
          <h3>New Notifications</h3>
          <Link className="text-blue-600 font-semibold" href="">
            View all
          </Link>
        </div>
        <div className="flex flex-col justify-start">
          {data?.map((noti, index) => (
            <Link key={index} href={`/applications/${noti?.applicationId}`}>
              <div className="flex ml-3 justify-start items-center gap-3 pt-4 hover:bg-gray-100 rounded">
                <div className="p-3 rounded-full bg-blue-100/50">
                  <MdMailOutline size={20} color="#2563eb" />
                </div>
                <p className="text-base font-medium text-gray-500">
                  <span className="text-black">{noti?.fullName}</span> has
                  applied to{" "}
                  <span className="text-blue-600">{noti?.title}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
