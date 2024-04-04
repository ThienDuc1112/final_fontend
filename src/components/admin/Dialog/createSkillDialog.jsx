"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/business/Gallergy/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateSkillMutation } from "@/Context/features/skill/skillApiSlice";
import DropdownInput from "@/components/content/dropdownInput";
import { getCareer } from "@/app/api/provider/api";

export default function CreateSkillDialog({ notify, trigger }) {
  const [createSkill] = useCreateSkillMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [skill, setSkill] = useState({
    nameSkill: "",
    careerId: null,
  });
  const [nameError, setNameError] = useState();
  const [careerIdError, setCareerIdError] = useState();
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCareer();
        setCareers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const validateData = () => {
    let isValid = true;

    if (skill.nameSkill.trim() === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (skill.careerId === null) {
        setCareerIdError(true);
      isValid = false;
    } else {
        setCareerIdError(false);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      let isValid = validateData();
      if (isValid) {
        await createSkill(skill);
        notify(true, "Create skill successfully");
        trigger("refresh");
      }
    } catch (error) {
      console.log(error);
      notify(false, "Create failed");
    }
  };

  return (
    <Dialog variant="blue" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new skill</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1200px]">
              <div>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="section-for">
                    <div className="flex min-w-[550px] gap-4">
                      <div className="ant-form-item-label pt-3 w-1/5">
                        <Label className="text-black">Name Skill</Label>
                      </div>
                      <div className="w-full">
                        <Input
                          type="text"
                          value={skill.nameSkill}
                          onChange={(e) =>
                            setSkill({
                              ...skill,
                              nameSkill: e.target.value,
                            })
                          }
                          required
                          className="border-gray-700"
                          placeholder="Enter career name..."
                        />
                        {nameError && (
                          <span className=" text-red-500 text-sm">
                            Name skill is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex min-w-[550px] gap-4">
                      <div className="ant-form-item-label pt-3 w-1/5">
                        <Label className="text-black">Career</Label>
                      </div>
                      <div className="w-full">
                      <div className="w-full">
                          <DropdownInput
                            MyLabel=""
                            DataList={careers}
                            onDataSelect={(value, id) =>
                              setSkill({ ...skill, careerId: id })
                            }
                          />
                          {careerIdError && (
                            <span className=" text-red-500 text-sm">
                              Career is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="blue" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
