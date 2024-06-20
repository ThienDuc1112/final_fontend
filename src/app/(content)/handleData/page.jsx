"use client";
import { useState, useEffect } from "react";
import { treeData, myTreeData } from "@/utils/buildingData";
export default function HandleData() {
  const [data, setData] = useState([]);
  const newArray = treeData.map((item) => {
    const newElement = {
      [item.roomId]: { checked: true, partialCheck: false },
    };
    return newElement;
  });

  const getFloors = (treeData, myTreeData) => {
    const floors = [];

    myTreeData.forEach((building) => {
      building.children.forEach((floor) => {
        const allRoomIdsExist = floor.children.every((room) =>
          treeData.some((data) => data.roomId === room.roomId)
        );
        const isNotNull = floor.children.some((room) => treeData.some((data) => data.roomId === room.roomId));
        if (allRoomIdsExist) {
          floors.push({
            [floor.floor]: {
              check: true,
              partialCheck: false,
            },
          });
        } else if(!allRoomIdsExist && isNotNull){
          floors.push({
            [floor.floor]: {
              check: false,
              partialCheck: true,
            },
          });
        }
      });
    });

    return floors;
  };

  const getCheckedBuildings = (newList, myTreeData) => {
    const buildings = [];
    myTreeData.forEach((building) => {
      if (
        building.children.every((floor) =>
           newList.filter(el => el[Object.keys(el)[0]].check === true).some((data) => Object.keys(data)[0] === floor.floor)
        )
      ) {
        buildings.push({
          [building.buildingId]: { check: true, partialCheck: false },
        });
      } else {
        buildings.push({
          [building.buildingId]: { check: false, partialCheck: true },
        });
      }
    });
    return buildings;
  };
  const newList = getFloors(treeData, myTreeData);
  const checkedBuildings = getCheckedBuildings(newList, myTreeData);
  console.log(newList);
  console.log(checkedBuildings);

  return <div>data:</div>;
}
