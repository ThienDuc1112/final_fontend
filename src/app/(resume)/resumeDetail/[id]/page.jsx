"use client";
import { FaDownload } from "react-icons/fa";
import ResumeComponent from "@/components/content/resumeComponent";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeDetail({ params }) {
  const resumeData = {
    id: 1,
    fullName: "John Doe",
    phoneNumber: "+1-868344765",
    email: "johndoe@example.com",
    linkedln: "https://www.linkedin.com/in/johndoe",
    gender: "Male",
    country: "11 Harbour, New York, United States",
    dateOfBirth: new Date("2001-02-20T17:00:00.000Z"),
    statusOfEmployment: "Employed",
    avatarUrl: "https://example.com/avatar.jpg",
    description:
      "• I have 7 years of work experience in software development.• I have experience and strong at Software and Web Application using Java. • I am able to apply Selenium and Appium automation test frameworks using Java.",
    title: "Software Developer",
    nameCareer: "Software Engineering",
    additionalSkills: "Problem-solving, time-management, teamwork.",
    educationsDTO: [
      {
        universityName: "University of XYZ",
        degree: "Bachelor's",
        description:
          "• Studied computer science and specialized in software development. • GPA: 3.6",
        major: "Computer Science",
        startDate: new Date("2010-09-01T00:00:00.000Z"),
        endDate: new Date("2014-06-01T00:00:00.000Z"),
      },
    ],
    experiencesDTO: [
      {
        company: "ABC Corp",
        title: "Software Engineer",
        startDate: new Date("2015-07-01T00:00:00.000Z"),
        endDate: new Date("2020-12-31T00:00:00.000Z"),
        responsibility:
          "• Developed web applications using JavaScript and React.• Apply advanced technologies for the project like Java, Spring, MongoDB. • Research and apply LiSa tool to automation test.",
      },
      {
        company: "XYZ Inc",
        title: "Senior Software Engineer",
        startDate: new Date("2021-01-01T00:00:00.000Z"),
        endDate: new Date("2023-01-01T00:00:00.000Z"),
        responsibility:
          "• Leading a team of developers and architecting scalable solutions.• Apply advanced technologies for the project like Java, Spring, MongoDB. • Research and apply LiSa tool to automation test.",
      },
    ],
    skillOfResumeDTOs: [
      {
        id: 1,
        skillName: "JavaScript",
      },
      {
        id: 2,
        skillName: "React",
      },
      {
        id: 3,
        skillName: "NodeJs",
      },
    ],
    languageOfResumeDTOs: [
      {
        id: 1,
        languageName: "English",
        level: "Fluent",
      },
      {
        id: 2,
        languageName: "Spanish",
        level: "Intermediate",
      },
    ],
  };

  const handleDownloadClick = () => {
    console.log("Download button clicked");
  };

  const reportTemplateRef = useRef(null);
  // const handleGeneratePdf = async () => {
  //   const canvas = await html2canvas(reportTemplateRef.current, { scale: 2 }); // Adjust scale for quality
  //   const imgData = canvas.toDataURL("image/png");
  //   let doc = new jsPDF({
  //     format: "a4",
  //     unit: "px",
  //   });
  //   doc.setFontSize(8);
  //   doc.html(reportTemplateRef.current, {
  //     async callback(doc) {
  //       doc.save("resume");
  //     },
  //   });
  // };
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
    <div className="section-box h-full relative pt-[100px] bg-resume">
      {/* <div>Id: {params.id}</div>; */}
      <div className="view-navbar z-10">
        <div>Viewing CV of {resumeData.fullName}</div>
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
          <ResumeComponent resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
