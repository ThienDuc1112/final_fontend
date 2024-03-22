"use client";
import { useState, useEffect } from "react";
import MyPagination from "@/components/myPagination";
import MyIconDialog from "@/components/MyIconDialog";
import { useSearchParams } from "next/navigation";
import TokenService from "@/utils/Token.service";
import Link from "next/link";
import { MdMailOutline } from "react-icons/md";
import {
  useGetMessageQuery,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} from "@/Context/features/message/messageApiSlice";
import functions from "@/utils/functions";
import SignalRService from "@/utils/signalrService";

export default function Notification() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { userId, role } = TokenService.getUserProfile();
  const { data, isLoading, error, refetch } = useGetMessageQuery({
    userId: userId,
    page: currentPage,
  });

  const [updateMessage] = useUpdateMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [totalPages, setTotalPages] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleUpdateMessage = async () => {
    try {
      data.messages.forEach(async (notification) => {
        if (!notification.isSeen) {
          const updatedNotification = { ...notification, isSeen: true };
          const response = await updateMessage(updatedNotification);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        refetch();
        if (data !== undefined) {
          if (data.messages.length > 0) {
            setMessages(data.messages);
            setTotalPages(Math.ceil(data.totalMessage / 8));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      if (data.messages.length > 0) {
        setMessages(data.messages);
        setTotalPages(Math.ceil(data.totalMessage / 8));
        const shouldUpdate = data.messages.some(
          (notification) => !notification.isSeen
        );
        if (shouldUpdate) {
          handleUpdateMessage();
          refetch();
        }
      }
    }
  }, [data]);

  useEffect(() => {
    const signalRService = new SignalRService();

    signalRService.startConnection();
    signalRService.addNotificationCountListener((userId2, count, message) => {
      if (userId2 === userId) {
        setMessages((prevMessages) => [message, ...prevMessages]);
        setTotalPages(Math.ceil(data.totalMessage / 8));
      }
    });
    return () => {
      signalRService.connection.stop();
    };
  }, [userId]);

  const handleDeleteMessage = async (id) => {
    try {
      const response = await deleteMessage({ id: id });
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-box mt-[10px] relative">
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[400px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="relative flex justify-center mt-[150px] mb-[300px]">
          <div className="mx-5">
            <h2>Notifications</h2>
            <p className="text-base font-normal">
              {" "}
              Get new notifications and stay informed{" "}
            </p>
            <div className="mt-10 py-5 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
              <div className="bg-blue-100 px-2 py-6 font-medium rounded-md">
                <div className="grid grid-cols-12 gap-4 text-blue-500 text-start">
                  <div className="col-span-9 pl-4">Notification</div>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-1">Action</div>
                </div>
              </div>
              {messages.length > 0 &&
                messages.map((item, index) => (
                  <div key={index} className="px-2 py-7 font-medium rounded-md">
                    <div className="grid grid-cols-12 gap-4 text-blue-500 text-start pb-3">
                      <div className="col-span-9 pl-2">
                        <Link href={`/applications/2`}>
                          <div className="flex justify-start items-center gap-3 hover:bg-gray-100 rounded">
                            <div className="p-3 rounded-full bg-blue-100/50">
                              <MdMailOutline size={20} color="#2563eb" />
                            </div>
                            <p className="text-base font-medium text-gray-500">
                              <span className="text-black">
                                {`${
                                  item.type === "Interviewing"
                                    ? "Getting schedule and meeting room for job "
                                    : item.type === "Shortlisted"
                                    ? "Your application passed the CV phase for job "
                                    : item.type === "Accepted"
                                    ? "Your application was accepted for job "
                                    : "Your application was rejected for job "
                                }`}
                              </span>
                              <span className="text-blue-600 pl-1">
                                {item.title}{" "}
                              </span>
                            </p>
                            <span className="text-gray-400">
                              {!item.isSeen && "(new)"}
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="col-span-2 text-gray-500">
                        {functions.convertToDayMonthYear(item.createdDate)}
                      </div>
                      <div className="col-span-1 text-red-600 hover:shadow-red-800">
                        {" "}
                        <MyIconDialog
                          handleConfirm={() => handleDeleteMessage(item.id)}
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              {totalPages !== undefined && (
                <div className="pagination mt-5 mb-1 mx-auto">
                  <MyPagination totalPages={totalPages} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
