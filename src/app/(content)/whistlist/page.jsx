"use client";
import { useState } from "react";
import { useGetFavoriteJobQuery,useDeleteFavoriteJobMutation } from "@/Context/features/favoriteJob/favoriteJobApiSlice";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TokenService from "@/utils/Token.service";
import HelpFunctions from "@/utils/functions";

export default function Whistlist() {
  const { userId, role } = TokenService.getUserProfile();
  const { data, isLoading,refetch } = useGetFavoriteJobQuery({ candidateId: userId });
  const [Delete, {data:data2}] = useDeleteFavoriteJobMutation();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleDelete = async (id) => {
    try{
      await Delete({ id });
      refetch();
    }catch(error){
      console.log(error)
    }
  }
  return (
    <section className="section-box mt-[10px] relative">
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow mt-[400px] ml-[200px] mb-[500px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[1100px] mx-auto my-[200px]">
          <div className="div flex flex-col items-center justify-center">
            <h2 className="mb-5">Your saved jobs</h2>
            <div className="mt-4 w-full">
              <hr />
              {data?.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-12 text-slate-700 text-start text-lg py-3 px-2">
                    <div className="col-span-1 flex items-center pl-3">
                      <button
                        className="button"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleDelete(item.id)}
                      >
                        {isHovered ? (
                          <MdClose size={28} color="#374151" />
                        ) : (
                          <FaHeart size={22} color="#2563eb" />
                        )}
                      </button>
                    </div>
                    <div className="col-span-6 flex items-center gap-5">
                      <Image
                        src="/images/logo.png"
                        width={80}
                        height={50}
                        alt="logo"
                        style={{
                          borderRadius: "6px",
                          boxShadow: "0 0 3px #999",
                        }}
                      />
                      <div className="flex flex-col">
                        <a
                          className="text-xl font-semibold"
                          href={`/jobs/${item.jobId}`}
                        >
                          {item?.jobName}
                        </a>
                        <a
                          className="text-gray-500 hover:underline"
                          href={`/businessDetail/${item.businessId}`}
                        >
                          {item?.businessName}
                        </a>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center text-emerald-600 font-semibold">
                      Expire: in{" "}
                      {Math.max(
                        new Date().getDate() -
                          HelpFunctions.getDay(item.expiredDate),
                        0
                      )}{" "}
                      days
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Button
                        variant="outline"
                        size="xl"
                        onClick={() => {
                          router.push(`/jobs/${item.jobId}`);
                        }}
                      >
                        View Job
                      </Button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
