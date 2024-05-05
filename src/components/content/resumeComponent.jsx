import Image from "next/image";
export default function ResumeComponent({ resumeData }) {
  function convertToDayMonthYear(dat) {
    const date = new Date(dat);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
  const descriptions = resumeData?.description
    .trim()
    .split("•")
    .filter((element) => element !== "");
  console.log(resumeData);
  let avatar =
    "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/" +
    resumeData.avatarUrl;
  return (
    <>
      <div className="wraper relative">
        <div className="main-content">
          <div className="header">
            <div className="info">
              <div className="box-section">
                <div className="avatar_info">
                  <Image
                    src={avatar}
                    width={100}
                    height={176}
                    alt="avatar"
                    className="avatar"
                  />
                </div>
                <div className="personal_info">
                  <div className="font-semibold">{resumeData?.fullName}</div>
                  <div className="font-semibold">{resumeData?.title}</div>
                  <div className="general">
                    <div className="resume_person">
                      <p className="inline">{resumeData?.phoneNumber}</p>
                      <p className="inline">{resumeData?.email}</p>
                      <p className="inline">
                        {convertToDayMonthYear(resumeData?.dateOfBirth)}
                      </p>
                    </div>
                    <div className="resume_person">
                      <p>{resumeData?.linkedln}</p>
                    </div>
                    <div className="resume_person">
                      <p>{resumeData?.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="introduction">
            <div className="box-selection">
              <div className="main_title_section">Introduce Yourself</div>
              <hr className="ct_line_hr_color" />
              <div className="content_summary section_item desc">
                <ul style={{ listStyleType: "disc", paddingLeft: "1em" }}>
                  {descriptions.map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="technical-skill">
            <div className="box-selection">
              <div className="main_title_section">Technical Skills</div>
              <hr className="ct_line_hr_color" />
              <div className="content_summary section_item">
                <ul
                  style={{
                    fontSize: "13px",
                  }}
                >
                  <li>
                    <span className="flex flex-wrap">
                      <strong>{resumeData?.nameCareer}:&nbsp;</strong>
                      {resumeData?.skillOfResumeDTOs.map((skill, index) => (
                        <p key={index}>{skill?.skillName}</p>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="section-item" style={{ fontSize: "13px" }}>
                <strong>Other Skills:&nbsp; </strong>
                {resumeData?.additionalSkills}
              </div>
            </div>
          </section>
          <section className="technical-skill">
            <div className="box-selection">
              <div className="main_title_section">Working Experience</div>
              <hr className="ct_line_hr_color" />
              {resumeData?.experiencesDTO.map((experience, index) => (
                <div key={index} className="item_experience section_item">
                  <div className="top_info">
                    <div className="company_and_time">
                      <div className="company-name">
                        {experience.company}&nbsp;|&nbsp;{" "}
                        {convertToDayMonthYear(experience?.startDate)} -{" "}
                        {convertToDayMonthYear(experience?.endDate)}
                      </div>
                    </div>
                    <div className="work_position pb-2.5">
                      <span>{experience?.title}</span>
                    </div>
                  </div>
                  <div className="work_responsipility section_item">
                    <div className="title_respo">Responsibilities</div>
                    {experience?.responsibility
                      .split("• ")
                      .filter((element) => element !== "")
                      .map((res, index) => (
                        <div key={index} className="desc">
                          <p>- {res}</p>
                          <br className="br_break" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="technical-skill">
            <div className="box-selection">
              <div className="main_title_section">Education</div>
              <hr className="ct_line_hr_color" />
              {resumeData?.educationsDTO.map((education, index) => (
                <div key={index} className="item_experience section_item">
                  <div className="top_info">
                    <div className="company_and_time">
                      <div className="company-name">
                        {education.universityName}&nbsp;|&nbsp;{" "}
                        {convertToDayMonthYear(education?.startDate)} -{" "}
                        {convertToDayMonthYear(education?.endDate)}
                      </div>
                    </div>
                    <div className="work_position pb-2.5">
                      <span>Major: {education?.major}</span>
                    </div>
                  </div>
                  <div className="work_responsipility section_item">
                    <div className="title_respo">Description</div>
                    {education?.description &&
                      education.description
                        .split("• ")
                        .filter((element) => element !== "")
                        .map((res, index) => (
                          <div key={index} className="desc">
                            <p>- {res}</p>
                            <br className="br_break" />
                          </div>
                        ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="technical-skill">
            <div className="box-selection">
              <div className="main_title_section">Language</div>
              <hr className="ct_line_hr_color" />
              <div className="content_languages section_item">
               {resumeData?.languageOfResumeDTOs.map((lang, index) =>
               (
                <div key={index} className="item">
                <div className="item_content">
                  <p className="sm:col-span-5 font-bold item_left">{lang?.languageName}</p>
                  <p className="sm:col-span-2 item_center">|</p>
                  <p className="sm:col-span-5 item_right">{lang?.level}</p>
                </div>
              </div>
               ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
