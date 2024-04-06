"use client";
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineDown } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { BsBookmarkCheck } from "react-icons/bs";
import TokenService from "@/utils/Token.service";
import { useGetNewMessageCountQuery } from "@/Context/features/message/messageApiSlice";
import { useRouter } from "next/navigation";
import SignalRService from "@/utils/signalrService";
import CustomTooltip from "@/components/content/toolTip";
import { googleLogout } from "@react-oauth/google";

const Dropdown = () => {
  const router = useRouter();

  const handleSignOut = () => {
    try {
      googleLogout();
      TokenService.removeUser();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const { userId, role, name } = TokenService.getUserProfile();
  const { data, isLoading, error, refetch } = useGetNewMessageCountQuery({
    userId: userId,
  });
  const [notificationCount, setNotificationCount] = useState(0);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      setNotificationCount(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        refetch();
        if (data !== undefined) {
          setNotificationCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [click]);

  useEffect(() => {
    const signalRService = new SignalRService();

    signalRService.startConnection();
    signalRService.addNotificationCountListener((userId2, count) => {
      if (userId2 === userId) {
        setNotificationCount(count);
        console.log(count);
      }
    });
    return () => {
      signalRService.connection.stop();
    };
  }, [userId]);

  let href;
  if (role === "employer") {
    href = "/business/notifications";
  } else {
    href = "/notifications";
  }

  return (
    <div className="flex items-center justify-start gap-[15px]">
      <div
        className="p-3 rounded-lg hover:bg-gray-300 relative"
        onClick={() => {
          router.push(`${href}`);
          setClick(!click);
        }}
      >
        <IoIosNotifications size={24} />
        <CustomTooltip
          content={`You have new ${
            notificationCount === 1
              ? "1 notification"
              : `${notificationCount} notifications`
          }`}
          position="bottom"
          duration={4000}
          count={notificationCount}
        />
        <p className="rounded-full bg-blue-500 text-white text-center count-notification">
          {notificationCount}
        </p>
      </div>
      <div className="dropdown-container">
        <div className="p-3 rounded-lg hover:bg-gray-200 flex items-center gap-3 rotate-icon">
          <FaCircleUser size={22} />
          <span>{name?.split("@")[0]}</span>
          {role !== "employer" && (
            <AiOutlineDown size={22} className="my-icon" />
          )}
        </div>
        {role !== "employer" && (
          <div className="dropdown-list z-30 w-[240px] shadow-lg">
            <a className="hover-item" href="/applications">
              <div className="px-2 py-3 flex items-center justify-start gap-2">
                <div className="p-1 bg-gray-200 rounded-sm change-item">
                  <TbReportSearch size={22} className="change-icon" />
                </div>
                <span className="change-text">Manage Applications</span>
              </div>
            </a>
            <a className="hover-item" href="/resume/management">
              <div className="px-2 py-3 flex items-center justify-start gap-2">
                <div className="p-1 bg-gray-200 rounded-sm change-item">
                  <FaRegFileLines size={22} className="change-icon" />
                </div>
                <span className="change-text">Manage Resumes</span>
              </div>
            </a>
            <a className="hover-item" href="/whistlist">
              <div className="px-2 py-3 flex items-center justify-start gap-2">
                <div className="p-1 bg-gray-200 rounded-sm change-item">
                  <BsBookmarkCheck size={22} className="change-icon" />
                </div>
                <span className="change-text">Saved Jobs</span>
              </div>
            </a>
            <a
              className="hover-item"
              href="/auth/login"
              onClick={handleSignOut}
            >
              <div className="px-2 py-3 flex items-center justify-start gap-2">
                <div className="p-1 bg-gray-200 rounded-sm change-item">
                  <PiSignOutBold size={22} className="change-icon" />
                </div>
                <span className="change-text">Sign Out</span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
