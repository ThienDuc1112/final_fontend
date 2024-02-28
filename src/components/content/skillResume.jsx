import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import DropdownInput from "@/components/content/dropdownInput";

export default function SkillResume({
  onChangeData,
  setAddSkill,
  setCheck,
  isValid,
}) {
  const careerOptions = [
    {
      id: 1,
      name: "Web Developer",
      skills: [
        { id: 1, name: "JavaScript" },
        { id: 2, name: "HTML" },
        { id: 3, name: "CSS" },
        { id: 4, name: "Front-end Frameworks" },
      ],
    },
    {
      id: 2,
      name: "Data Scientist",
      skills: [
        { id: 5, name: "Python" },
        { id: 6, name: "R" },
        { id: 7, name: "Machine Learning" },
        { id: 8, name: "Data Visualization" },
      ],
    },
  ];

  const [selectedCareer, setSelectedCareer] = useState(careerOptions[0].name);
  const [selectedSkillList, setSelectedSkillList] = useState([
    {
      resumeId: 0,
      skillId: null,
      skillError: false,
    },
  ]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [additonalSkill, setAdditionalSkill] = useState("");

  useEffect(() => {
    setSkillOptions(
      careerOptions.find((career) => career.name === selectedCareer)?.skills ||
        []
    );
  }, [selectedCareer]);

  const checkValid = () => {
    return selectedSkillList.every((skill) => {
      return skill.skillError === false;
    });
  };

  const validateSkill = (skill) => {
    if (skill.skillId === "" || skill.skillId === null) {
      skill.skillError = true;
    } else {
      skill.skillError = false;
    }
  };
  const handleCheckChange = useCallback(() => {
    const updatedSkills = [...selectedSkillList];
    updatedSkills.forEach((skill) => {
      validateSkill(skill);
    });
    setSelectedSkillList(updatedSkills);
  }, [selectedSkillList]);

  useEffect(() => {
    handleCheckChange();
    const data = checkValid();
    isValid(data);
  }, [setCheck, isValid]);

  const handleCareerChange = (value) => {
    setSelectedCareer(value);
  };

  const handleSkillChange = (value, index) => {
    const updatedSkillList = [...selectedSkillList];
    updatedSkillList[index] = {
      ...updatedSkillList[index],
      skillId: value,
    };
    setSelectedSkillList(updatedSkillList);
    onChangeData(updatedSkillList);
  };

  const addSkill = () => {
    setSelectedSkillList([
      ...selectedSkillList,
      {
        resumeId: 0,
        skillId: null,
        skillError: false,
      },
    ]);
  };

  const removeSkill = (index) => {
    setSelectedSkillList((prevSelectedSkillList) => {
      const updatedSkillList = [...prevSelectedSkillList].filter(
        (_, i) => i !== index
      );
      onChangeData(updatedSkillList);
      return updatedSkillList;
    });
  };

  return (
    <div className="personal-intro mt-5">
      <h3 className="title-resume">Working Skill</h3>
      <div className="section-form">
        <div className="flex items-center mb-6 max-w-[550px]">
          <div className="ant-form-item-label">
            <Label className="ant-form-item-required pt-5">
              Skill From Career
            </Label>
          </div>
          <DropdownInput
            DataList={careerOptions}
            onDataSelect={handleCareerChange}
          />
        </div>
        {selectedSkillList.map((skill, index) => (
          <div
            key={index}
            className={`flex items-stretch ${
              index === 0 ? "max-w-[550px]" : "max-w-[650px]"
            }`}
          >
            <div className="ant-form-item-label pt-5">
              <Label className="ant-form-item-required">Your Skill</Label>
            </div>
            <div className="w-full flex flex-col self-start">
              <DropdownInput
                DataList={skillOptions}
                onDataSelect={(value, id) => handleSkillChange(id, index)}
              />
              {skill.skillError && (
                <span className="text-red-500 text-sm">Skill is required</span>
              )}
            </div>
            {index >= 1 && (
              <div className="pl-5 pt-2">
                <MyDialog
                  color="destructive"
                  name="Delete"
                  handleConfirm={() => removeSkill(index)}
                ></MyDialog>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <div className="px-5">
            <Button variant="blue" onClick={addSkill}>
              Add new Skill
            </Button>
          </div>
        </div>
        <div className="border border-gray-400 mb-5 mt-5"></div>
        <div className="flex mb-6 max-w-[550px]">
          <div className="ant-form-item-label pt-3">
            <Label className="pt-5">Additional Skill</Label>
          </div>
          <div className="w-full">
            <Input
              type="text"
              value={additonalSkill}
              onChange={(e) => {
                setAdditionalSkill(e.target.value);
                setAddSkill(e.target.value);
              }}
              placeholder="e.g Solid, Angular, .Net core"
              className="border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
