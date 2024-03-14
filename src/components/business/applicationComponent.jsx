import Image from "next/image";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useUpdateApplicationMutation } from "@/Context/features/application/applicationApiSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  setLoading,
} from "@/Context/features/application/applicationSlice";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import HelpFunctions from "@/utils/functions";

export default function ApplicationList({ appId, item, onClick }) {
  const [updateApplication, { isLoading, error, success }] =
    useUpdateApplicationMutation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const url = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";
  const imagePath = item.avatarUrl ? url + item.avatarUrl : "/images/mya.jpg";

  const handleAccept = async () => {
    const app = {
      id: item.id,
      status: "Shortlisted",
    };
    try {
      dispatch(setLoading(true));
      const response = await updateApplication(app);
      onClick("data");
      if (response.data.success) {
      }
    } catch (error) {
      console.log("error:" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleReject = async () => {
    const app = {
      id: item.id,
      status: "Rejected",
    };
    try {
      dispatch(setLoading(true));
      const response = await updateApplication(app);
      onClick("data");
      if (response.data.success) {
      }
    } catch (error) {
      console.log("error:" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="rounded-lg border border-gray-200 p-5">
      <div className="flex justify-between">
        <div className="flex justify-start items-center">
          <div className="p-3">
            <Image
              src={imagePath}
              width={100}
              height={80}
              alt="avatar"
              className="rounded-full "
            />
          </div>
          <div className="flex flex-col justify-center">
            <Link href={`/resumeDetail/${item.resumeId}`} target="_blank">
              <h3 className="text-black hover:text-blue-600">
                {item.fullName}
              </h3>
            </Link>
            <div className="flex items-center gap-2 pt-1">
              <FaBriefcase size={16} color="#575653" />
              <p className="font-normal text-sm">{item.title}</p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <IoMdTime size={18} color="#575653" />
              <p className="font-normal text-sm">
                {HelpFunctions.convertToDayMonthYear(item.createdDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="max-h-5">
          <div className="flex flex-col items-center h-full">
            {item.status !== "Pending" ? (
              <p
                className={`p-2 rounded-lg font-medium ${
                  item.status === "Accepted"
                    ? "bg-emerald-100 text-emerald-600"
                    : item.status === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : item.status === "Shortlisted"
                    ? "bg-blue-100 text-blue-600"
                    : ""
                }`}
              >
                {item.status}
              </p>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  className="hover:translate-y-[-3px] p-2 bg-blue-100 rounded-sm"
                  onClick={handleAccept}
                >
                  <AiOutlineCheck color="#2563eb" />
                </button>
                <button
                  className="hover:translate-y-[-3px] p-2 bg-red-100 rounded-sm"
                  onClick={handleReject}
                >
                  <AiOutlineCloseCircle color="#dc2626" />
                </button>
              </div>
            )}
            {item.status === "Shortlisted" || item.status === "Interviewing" ? (
              <div className="flex items-center gap-3">
                <Link
                  href={`/business/manageApplications/detail/${appId}`}
                  className="px-2 rounded-xl font-small mt-[60px] bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 underline text-sm">
                      Next Step
                    </span>
                    <FaArrowUpRightFromSquare color="#4b5563" />
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
