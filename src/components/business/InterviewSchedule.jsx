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
import { useAddInterviewMutation } from "@/Context/features/interview/interviewApiSlice";
import { useUpdateApplicationMutation } from "@/Context/features/application/applicationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrigger,
  selectApplicationId,
  selectMeetingUrl,
  selectInterviewSchedule,
  selectStatus,
  setTrigger,
  setNotify,
  setInterviewSchedule,
  setStatus,
  setMeetingUrl, 
} from "@/Context/features/interview/interviewDetailSlice";
import { format } from "date-fns";

export default function InterviewSchedule({ open, setOpen }) {
  const [addInterview, { isLoading: isLoading2, error: error2, success }] =
    useAddInterviewMutation();
  const [updateApplication, { isLoading:loading2, error:err, success:suc }] =
    useUpdateApplicationMutation();
  const applicationId = useSelector(selectApplicationId);
  const meetingUrl = useSelector(selectMeetingUrl);
  const scheduleInterview = useSelector(selectInterviewSchedule);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const trigger = useSelector(selectTrigger);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSubmit = async () => {
    dispatch(setTrigger(!trigger));
    dispatch(setNotify("Interviewing schedule is created succesfully"));
    setOpen(false);
    dispatch(setInterviewSchedule(selectedDate));
    const schedule = {
      appliedJobId: applicationId,
      interviewTime: selectedDate,
    };
     await addInterview(schedule);
  };

  useEffect(() => {
    const updateApp = async () => {
      if (meetingUrl !== null && scheduleInterview !== null && status==="Shortlisted") {
        const app = {
          id: applicationId,
          status: "Interviewing",
        };
        const response = await updateApplication(app);
        dispatch(setStatus("Interviewing"));
        console.log(response);
      }
    }
    updateApp();
   
  },[scheduleInterview,meetingUrl])

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
