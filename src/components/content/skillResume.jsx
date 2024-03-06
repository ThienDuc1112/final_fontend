import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import DropdownInput from "@/components/content/dropdownInput";
import { getCareersWithSkills } from "@/app/api/provider/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedSkillList,
  setSelectedSkillList,
} from "@/Context/features/resume/resumeSlice";

export default function SkillResume({ setAddSkill, setCheck, isValid }) {
  const [careerOptions, setCareerOptions] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const dispatch = useDispatch();
  const selectedSkillList = useSelector(selectSelectedSkillList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCareerInfo = await getCareersWithSkills();
        setCareerOptions(allCareerInfo.data);
        console.log(allCareerInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (careerOptions && careerOptions.length > 0) {
      setSelectedCareer(careerOptions[0].name);
    }
  }, [careerOptions]);

  const [skillOptions, setSkillOptions] = useState([]);
  const [additonalSkill, setAdditionalSkill] = useState("");

  useEffect(() => {
    if (selectedCareer && careerOptions) {
      const selectedCareerInfo = careerOptions.find(
        (career) => career.name === selectedCareer
      );
      setSkillOptions(selectedCareerInfo?.skills || []);
    }
  }, [selectedCareer, careerOptions]);

  const checkValid = () => {
    return selectedSkillList.every((skill) => {
      return skill.skillError === false;
    });
  };

  const validateSkill = (skill) => {
    if (skill.skillId === "" || skill.skillId === null) {
      return { ...skill, skillError: true };
    } else {
      return { ...skill, skillError: false };
    }
  };
  const handleCheckChange = useCallback(() => {
    const updatedSkills = selectedSkillList.map((skill) =>
      validateSkill(skill)
    );
    const hasDifference = updatedSkills.some((skill, index) => skill.skillError !== selectedSkillList[index].skillError);

  if (hasDifference) {
    dispatch(setSelectedSkillList(updatedSkills));
  }
  }, [selectedSkillList, dispatch]);

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
    dispatch(setSelectedSkillList(updatedSkillList));
  };

  const addSkill = () => {
    const newSkillList = [
      ...selectedSkillList,
      {
        resumeId: 0,
        skillId: null,
        skillError: false,
      },
    ];
    dispatch(setSelectedSkillList(newSkillList));
  };

  const removeSkill = (index) => {
    const updatedSkillList = selectedSkillList.filter((_, i) => i !== index);
    dispatch(setSelectedSkillList(updatedSkillList));
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
