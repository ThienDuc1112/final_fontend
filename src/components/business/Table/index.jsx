import { MdModeEdit } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import HelpFunctions from "@/utils/functions";
import { useRouter } from "next/navigation";

export default function Table({ title, data }) {
  const router = useRouter();
  const currentDate = new Date();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <h3 className="pb-2">{title}</h3>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left ">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black pl-11 text-xl">
                Job Title
              </th>
              <th className="min-w-[180px] px-4 py-4 font-medium text-black text-xl">
                Expiration Date
              </th>
              <th className="min-w-[140px] px-4 py-4 font-medium text-black text-xl">
                Number Of Recruitment
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black text-xl">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black text-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black text-base font-semibold">
                    {packageItem?.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <p
                    className={`text-lg flex justify-center ${
                      HelpFunctions.convertToDayMonthYear(
                        packageItem.expirationDate
                      ) > currentDate
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {HelpFunctions.convertToDayMonthYear(
                      packageItem.expirationDate
                    )}
                  </p>
                </td>
                <td className="border-b border-[#eee]px-4 py-5 ">
                  <p className="text-black text-lg flex justify-center">
                    {packageItem?.numberRecruitment}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem?.status === "Open"
                        ? "bg-emerald-200 text-emerald-600"
                        : packageItem?.status === "Closed"
                        ? "bg-red-200 text-red-600"
                        : "bg-blue-200 text-blue-600"
                    }`}
                  >
                    {packageItem?.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-white text-blue-600 p-2 rounded-full bg-blue-100" 
                    onClick={() => {
                      router.push(`/business/manageJobs/edit/${packageItem?.id}`)
                    }}
                    >
                      <MdModeEdit />
                    </button>
                    <button className="hover:text-white text-emerald-600 p-2 rounded-full bg-emerald-100" 
                    onClick={() => {
                      router.push(`/jobs/${packageItem?.id}`)
                    }}
                    >
                      <IoEyeSharp />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
