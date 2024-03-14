"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaRegCalendarCheck } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrigger,
  setTrigger,
  setNotify,
  setInterviewSchedule,
} from "@/Context/features/interview/interviewDetailSlice";
import { format } from "date-fns";

export default function InterviewSchedule({ open, setOpen }) {
  const dispatch = useDispatch();
  const trigger = useSelector(selectTrigger);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const formattedDateTime = format(selectedDate, "yyyy-MM-dd HH:mm");

  const handleSubmit = () => {
    dispatch(setTrigger(!trigger));
    dispatch(setNotify("Interviewing schedule is created succesfully"));
    setOpen(false);
    dispatch(setInterviewSchedule(formattedDateTime));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select date for the interviewing</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center my-5">
              <div className="flex relative">
                <DatePicker
                  className="border-2 border-gray-400 pl-[10px] pr-[150px] py-2 rounded-lg bg-sky-50"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                />
                <div className="absolute top-2 right-2">
                  <FaRegCalendarCheck size={24} color="#0284c7" />
                </div>
              </div>

              <div className="mt-2 mr-7">
                <span className="text-red-500 font-semibold">
                  Note: The selected time zone will be UTC + 0{" "}
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5 mb-1 flex items-center gap-5">
          <Button variant="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
