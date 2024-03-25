"use client";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
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
import { useAddCareerMutation } from "@/Context/features/career/careerApiSlice";

export default function BusinessDialog({ notify, trigger }) {
  const [updateCareer] = useAddCareerMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [career, setCareer] = useState({
    name: "",
    description: "",
  });
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState();

  const validateData = () => {
    let isValid = true;

    if (career.name.trim() === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (career.description.trim() === "") {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      let isValid = validateData();
      if (isValid) {
        await updateCareer(career);
        notify(true, "Update successfully");
        trigger("refresh");
      }
    } catch (error) {
      console.log(error);
      notify(false, "Update failed");
    }
  };

  return (
    <Dialog variant="blue" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new career</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1200px]">
                <div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="section-for">
                      <div className="flex min-w-[550px] gap-4">
                        <div className="ant-form-item-label pt-3 w-1/5">
                          <Label className="text-black">Name Career</Label>
                        </div>
                        <div className="w-full">
                          <Input
                            type="text"
                            value={career.name}
                            onChange={(e) =>
                              setCareer({
                                ...career,
                                name: e.target.value,
                              })
                            }
                            required
                            className="border-gray-700"
                            placeholder="Enter career name..."
                          />
                          {nameError && (
                            <span className=" text-red-500 text-sm">
                              Name career is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex min-w-[550px] gap-4">
                        <div className="ant-form-item-label pt-3 w-1/5">
                          <Label className="text-black">Description</Label>
                        </div>
                        <div className="w-full">
                          <textarea
                            value={career.description}
                            onChange={(e) =>
                              setCareer({
                                ...career,
                                description: e.target.value,
                              })
                            }
                            rows={8}
                            cols={8}
                            placeholder="Description..."
                            className="w-full rounded-lg border-[1.5px] border-gray-700 bg-transparent px-2 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white"
                          />
                          {descriptionError && (
                            <span className=" text-red-500 text-sm">
                              Description is required
                            </span>
                          )}
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
