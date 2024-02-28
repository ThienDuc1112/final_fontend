import React, { ReactNode } from "react";

const CardDataStats = ({ title, total, color, children }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7 py-6 shadow-default">
      <div className="flex justify-between gap-5">
        <div
          className={`flex h-11.5 w-11.5 items-center justify-center p-[20px] rounded-sm ${
            color === "blue" && "bg-blue-200/50"
          }
          ${color === "green" && "bg-green-200/50"} ${
            color === "yellow" && "bg-red-200/50"
          } ${color === "violet" && "bg-violt-200/50"}`}
        >
          {children}
        </div>

        <div className="flex flex-col items-end justify-between pl-[80px]">
          <div>
            <h4
              className={`text-title-md font-bold text-3xl pb-3
                ${color === "blue" && "text-blue-600"}
              ${color === "green" && "text-green-600"} ${
                color === "yellow" && "text-red-600"
              } ${color === "violet" && "text-violet-600"}`}
            >
              {total}
            </h4>
            <span className="text-md font-medium">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
