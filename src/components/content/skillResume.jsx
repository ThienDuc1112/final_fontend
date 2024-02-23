import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import DropdownInput from "@/components/content/dropdownInput";

export default function SkillResume() {
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
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSkillList, setSelectedSkillList] = useState([
    {
      skillId: null,
      name: "",
    },
  ]);
  const [skillOptions, setSkillOptions] = useState([]);

  console.log(selectedSkillList);

  useEffect(() => {
    setSkillOptions(
      careerOptions.find((career) => career.name === selectedCareer)?.skills ||
        []
    );
  }, [selectedCareer]);

  const handleCareerChange = (value) => {
    setSelectedCareer(value);
  };

  const handleSkillChange = (value, index) => {
    const updatedSkillList = [...selectedSkillList];
    updatedSkillList[index] = {
      ...updatedSkillList[index],
      name: value,
    };
    setSelectedSkillList(updatedSkillList);
  };

  const addSkill = () => {
    setSelectedSkillList([...selectedSkillList, selectedSkill]);
    setSelectedSkill("");
  };

  const removeSkill = (index) => {
    const updatedSkillList = [...selectedSkillList];
    updatedSkillList.splice(index, 1);
    setSelectedSkillList(updatedSkillList);
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
          <div key={index} className="flex items-center max-w-[550px]">
            <div className="ant-form-item-label">
              <Label className="ant-form-item-required">Your Skill</Label>
            </div>
            <DropdownInput
              DataList={skillOptions}
              onDataSelect={(value) => handleSkillChange(value, index)}
            />
            <div className="pl-6 pb-2">
              <MyDialog
                color="destructive"
                name="Delete"
                handleConfirm={() => removeSkill(index)}
              ></MyDialog>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <div className="px-5">
            <Button variant="blue" onClick={addSkill}>
              Add new Skill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
