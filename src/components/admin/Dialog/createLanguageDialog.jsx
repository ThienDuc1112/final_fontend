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
import { useCreateLanguageMutation } from "@/Context/features/language/languageApiSlice";

export default function CreateLanguageDialog({ notify, trigger }) {
  const [createLanguage] = useCreateLanguageMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState({
    languageName: "",
    level: "",
  });
  const [nameError, setNameError] = useState();

  let levels = ["Basic", "Intermediate", "Advanced"];

  const validateData = () => {
    let isValid = true;

    if (language.languageName.trim() === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setIsOpen(false);
    try {
      let isValid = validateData();
      if (isValid) {
        await Promise.all(
          levels.map((level) =>
            createLanguage({
              languageName: language.languageName,
              level: level,
            })
          )
        );
        notify(true, "Create language successfully");
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
          <DialogTitle>Create a new language</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1200px]">
              <div>
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="section-for">
                    <div className="flex min-w-[550px] gap-4">
                      <div className="ant-form-item-label pt-3 w-2/5">
                        <Label className="text-black">Name Language</Label>
                      </div>
                      <div className="w-full">
                        <Input
                          type="text"
                          value={language.languageName}
                          onChange={(e) =>
                            setLanguage({
                              ...language,
                              languageName: e.target.value,
                            })
                          }
                          required
                          className="border-gray-700"
                          placeholder="Enter language name..."
                        />
                        {nameError && (
                          <span className=" text-red-500 text-sm">
                            Name language is required
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
