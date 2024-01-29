import { AiOutlineCheck } from "react-icons/ai";
import "@/styles/global.css";

const Employer = () => {
  return (
    <div className="flex flex-grow flex-col px-16">
      <p className="text-2xl text-white font-medium mb-10">
        As an employeer you'll get access to:
      </p>
      <ul className="space-y-4">
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Post your job vacancies online
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          50k+ job seekers
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Largest talent database
        </li>
        <li className="text-blue-50 flex items-center gap-3">
        <AiOutlineCheck className="text-green"/>
          Create your FREE company account
        </li>
      </ul>
    </div>
  );
};

export default Employer;
