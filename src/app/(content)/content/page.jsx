"use client";
import TokenService from "@/utils/Token.service";
import { useSelector } from "react-redux";
import { selectUserId, selectRole } from "@/Context/features/auth/authSlice";
import { useGetAllCareerQuery } from "@/Context/features/career/careerApiSlice";

export default function Content() {
  const data2 = TokenService.getLocalAccessToken();
  const isAvailable = TokenService.isAccessExpired();
  const refreshToken = useSelector(selectUserId);
  const token = useSelector(selectRole);
  const { data, error, isLoading } = useGetAllCareerQuery();
  console.log(data);

  return (
    <>
      <h1 className="text-5xl text-red-600 font-semibold">You are here !!</h1>
      <h3>access: {data2}</h3>
      <h2 className="pt-[200px]">
        is expired: {isAvailable ? <div>true</div> : <div>false</div>}
      </h2>
      <div>
        Data: {refreshToken}:{token}
      </div>
    </>
  );
}
