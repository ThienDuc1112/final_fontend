import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyDialog from "@/components/myDialog";
import DropdownInput from "@/components/content/dropdownInput";

export default function LanguageResume({ onChangeData, setCheck, isValid }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [inde, setInde] = useState(null);
  const languageOptions = [
    { id: 1, name: "English", level: "Basic" },
    { id: 2, name: "English", level: "Intermediate" },
    { id: 3, name: "English", level: "Advanced" },
    { id: 4, name: "Spanish", level: "Basic" },
    { id: 5, name: "Spanish", level: "Intermediate" },
    { id: 6, name: "Spanish", level: "Advanced" },
    { id: 7, name: "French", level: "Basic" },
    { id: 8, name: "French", level: "Intermediate" },
    { id: 9, name: "French", level: "Advanced" },
    { id: 10, name: "German", level: "Basic" },
    { id: 11, name: "German", level: "Intermediate" },
    { id: 12, name: "German", level: "Advanced" },
  ];

  const languageNames = languageOptions.reduce((uniqueNames, option) => {
    if (!uniqueNames.some((item) => item.name === option.name)) {
      uniqueNames.push({ id: option.id, name: option.name });
    }
    return uniqueNames;
  }, []);

  const proficiencyLevels = [
    { id: 1, name: "Basic" },
    { id: 2, name: "Intermediate" },
    { id: 3, name: "Advanced" },
  ];

  const [selectedLanguageList, setSelectedLanguageList] = useState([
    {
      resumeId: 0,
      languageId: null,
      languageError: false,
    },
  ]);
  console.log(selectedLanguageList);
  const findIdByLanguageAndLevel = (selectedLanguage, selectedLevel) => {
    const language = languageOptions.find(
      (option) =>
        option.name === selectedLanguage && option.level === selectedLevel
    );
    return language ? language.id : null;
  };

  const checkValid = () => {
    return selectedLanguageList.every((language) => {
      return language.languageError === false;
    });
  };

  const validateLanguage = (language) => {
    if (language.languageId === "" || language.languageId === null) {
      language.languageError = true;
    } else {
      language.languageError = false;
    }
  };

  const handleCheckChange = useCallback(() => {
    const updatedLanguages = [...selectedLanguageList];
    updatedLanguages.forEach((language) => {
      validateLanguage(language);
    });
    setSelectedLanguageList(updatedLanguages);
  }, [selectedLanguageList]);

  useEffect(() => {
    handleCheckChange();
    const data = checkValid();
    isValid(data);
  }, [setCheck, isValid]);

  useEffect(() => {
    const founId = findIdByLanguageAndLevel(selectedLanguage, selectedLevel);
    const updatedLanguageList = [...selectedLanguageList];
    updatedLanguageList[inde] = {
      ...updatedLanguageList[inde],
      languageId: founId,
    };
    setSelectedLanguageList(updatedLanguageList);
    onChangeData(updatedLanguageList);
  }, [selectedLanguage, selectedLevel, inde]);

  const addLanguage = () => {
    setSelectedLanguageList([
      ...selectedLanguageList,
      {
        resumeId: 0,
        languageId: null,
        languageError: false,
      },
    ]);
  };

  const removeLanguage = (index) => {
    setSelectedLanguageList((prevSelectedLanguageList) => {
      const updatedLanguageList = [...prevSelectedLanguageList].filter(
        (_, i) => i !== index
      );
      onChangeData(updatedLanguageList);
      return updatedLanguageList;
    });
  };

  return (
    <div className="personal-intro mt-5">
      <h3 className="title-resume">Language</h3>
      <div className="section-form">
        {selectedLanguageList.map((language, index) => (
          <div
            key={index}
            className={`flex items-center justify-center ${
              index === 0 ? "max-w-[650px]" : "max-w-[750px]"
            }`}
          >
            <div className="ant-form-item-label pb-5">
              <Label className="ant-form-item-required">Language Name</Label>
            </div>
            <div className="w-full flex flex-col">
              <DropdownInput
                DataList={languageNames}
                onDataSelect={(value) => {
                  setSelectedLanguage(value);
                  setInde(index);
                }}
              />
              {language.languageError && (
                <span className="text-red-500 text-sm">
                  Language is required
                </span>
              )}
            </div>
            <div className="ant-form-item-label pl-7 pb-5">
              <Label className="ant-form-item-required">Level</Label>
            </div>
            <div className="w-full flex-col">
              <DropdownInput
                DataList={proficiencyLevels}
                onDataSelect={(value) => {
                  setSelectedLevel(value);
                  setInde(index);
                }}
              />
              {language.languageError && (
                <span className="text-red-500 text-sm">Level is required</span>
              )}
            </div>
            {index >= 1 && (
              <div className="pl-5 pb-1">
                <MyDialog
                  color="destructive"
                  name="Delete"
                  handleConfirm={() => removeLanguage(index)}
                ></MyDialog>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <div className="pt-8">
            <Button variant="blue" onClick={addLanguage}>
              Add New Language
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
