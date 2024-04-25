import { AiOutlineCheck } from "react-icons/ai";
import "@/styles/global.css";

const JobSeeker = () => {
  return (
    <div className="flex flex-grow flex-col px-16">
      <p className="text-2xl text-white font-medium mb-10">
        As a job seeker you&apos;ll get access to:
      </p>
      <ul className="space-y-4">
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Create your free resume
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          100k+ job vacancies
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Professional networking
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Email and SMS job alerts
        </li>
      </ul>
    </div>
  );
};

export default JobSeeker;
