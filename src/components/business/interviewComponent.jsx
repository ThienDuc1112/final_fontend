import Image from "next/image";
import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { RiComputerLine } from "react-icons/ri";
import HelpFunctions from "@/utils/functions";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function InterviewCard({candidate}) {
  const url = "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/";
  const imagePath = candidate.candidateAvatar !== null ? url + candidate.candidateAvatar : "/images/mya.jpg";
  const route = useRouter();

 const handleViewDetail = () => {
    route.push(`/business/manageApplications/detail/${candidate.id}`)
 }
                   
  return (
    <div className="rounded-lg border border-gray-200 p-5 mt-3">
      <div className="flex justify-between">
        <div className="flex justify-start items-center">
          <div className="p-1">
            <Image
              src={imagePath}
              width={100}
              height={80}
              alt="avatar"
              className="rounded-full "
            />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <h3 className="text-black">{candidate?.candidateName}</h3>
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center gap-2 pt-1">
                <FaBriefcase size={16} color="#575653" />
                <p className="font-normal text-sm">{candidate.candidateTitle}</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <IoMdTime size={18} color="#575653" />
                <p className="font-normal text-sm">
                  Applied: {HelpFunctions.convertToDayMonthYear(candidate?.appliedTime)}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <RiComputerLine size={18} color="#575653" />
                <Link
                  className="font-normal text-gray-600 text-sm italic underline"
                  href={`${candidate?.meetingLink}`}
                  target="_blank"
                >
                  Meeting Room Link
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="text-gray-600 bg-gray-200 text-sm px-3 rounded-xl font-small mt-[20px]">
                {HelpFunctions.formatTimeByUTC(candidate?.meetingTime)}
              </div>

              <Link
                href={`/resumeDetail/${candidate?.resumeId}`}
                className="px-3 rounded-xl font-small mt-[20px] bg-gray-200"
                target="_blank"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 underline text-sm">
                    View Resume
                  </span>
                  <FaArrowUpRightFromSquare color="#4b5563" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
        <Button variant="default" onClick={handleViewDetail}> View Details </Button>    
        </div>
      </div>
    </div>
  );
}
