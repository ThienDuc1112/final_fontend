"use client";
import { FaDownload } from "react-icons/fa";
import ResumeComponent from "@/components/content/resumeComponent";
import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useGetResumeInfoQuery } from "@/Context/features/resume/resumeApiSlice";
import TokenService from "@/utils/Token.service";

export default function ResumeDetail({ params }) {
  const { userId, role } = TokenService.getUserProfile();
  const { data, isLoading, error } = useGetResumeInfoQuery({ id: params.id });
  const [resumeData2, setResumeData2] = useState(null);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setResumeData2(data);
    }
  }, [data, isLoading]);
  console.log(data);

  const reportTemplateRef = useRef(null);
  const handleGeneratePdf = async () => {
    const canvas = await html2canvas(reportTemplateRef.current, { scale: 1 });
    const imgData = canvas.toDataURL("image/png");

    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });
    doc.addImage(imgData, "PNG", 0, 0);
    doc.save("resume");
  };

  return (
    <div>
      {isLoading ? (
        <div>aaa</div>
      ) : (
        <div className="section-box h-full relative pt-[100px] bg-resume">
          <div className="view-navbar z-10">
            <div>Viewing CV of {data.fullName}</div>
            <a
              onClick={handleGeneratePdf}
              className="cursor-pointer flex gap-2 items-center"
            >
              <FaDownload />
              Download PDF
            </a>
          </div>
          <div className="mx-[440px]">
            <div ref={reportTemplateRef}>
              <ResumeComponent resumeData={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
