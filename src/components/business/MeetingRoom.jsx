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
import { useUpdateMeetingMutation } from "@/Context/features/application/applicationApiSlice";
import { useUpdateApplicationMutation } from "@/Context/features/application/applicationApiSlice";
import {
  selectApplicationId,
  selectTrigger,
  selectStatus,
  selectMeetingUrl,
  selectInterviewSchedule,
  setTrigger,
  setNotify,
  setMeetingUrl,
  setStatus,
  setInterviewSchedule,
} from "@/Context/features/interview/interviewDetailSlice";
import { useGetMeetingRoomQuery } from "@/Context/features/interview/interviewApiSlice";
import { format } from "date-fns";

export default function MeetingRoom({ open, setOpen }) {
  const [updateMeeting, { isLoading: isLoading2, error: error2, success }] =
    useUpdateMeetingMutation();
  const [updateApplication, { isLoading: loading2, error: err, success: suc }] =
    useUpdateApplicationMutation();
  useUpdateApplicationMutation();
  const dispatch = useDispatch();
  const trigger = useSelector(selectTrigger);
  const applicationId = useSelector(selectApplicationId);
  const meetingUrl = useSelector(selectMeetingUrl);
  const scheduleInterview = useSelector(selectInterviewSchedule);
  const status = useSelector(selectStatus);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [check, setCheck] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const formattedDateTime = format(selectedDate, "yyyy-MM-dd HH:mm");
  const { data, isLoading, error } = useGetMeetingRoomQuery(
    { date: formattedDateTime },
    { skip: !check }
  );

  const handleSubmit = () => {
    dispatch(setTrigger(!trigger));
    dispatch(setNotify("meeting room is set succesfully"));
    setOpen(false);
    setCheck(true);
  };

  useEffect(() => {
    const updateMeetingUrl = async () => {
      if (data !== null && data !== undefined) {
        dispatch(setMeetingUrl(data.join_url));
        const app = {
          id: applicationId,
          url: data.join_url,
        };
        await updateMeeting(app);
      }
    };
    updateMeetingUrl();
  }, [data]);

  useEffect(() => {
    const updateApp = async () => {
      if (
        meetingUrl !== null &&
        scheduleInterview !== null &&
        status === "Shortlisted"
      ) {
        const app = {
          id: applicationId,
          status: "Interviewing",
        };
        const response = await updateApplication(app);
        dispatch(setStatus("Interviewing"));
      }
    };
    updateApp();
   
  }, [scheduleInterview, meetingUrl]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select date for the meeting room</DialogTitle>
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
                  utcOffset={7 * 60}
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
