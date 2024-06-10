"use client";
import { buildingData } from "@/utils/buildingData";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
export default function Test() {
  const [data, setData] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [room, setRoom] = useState([]);
  const [buildingId, setBuildingId] = useState(null);
  const [floorId, setFloorId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    setData(buildingData);
    let buildingInfo = buildingData.map((building) => ({
      id: building.buildingID,
      name: building.buildingName,
    }));
    setBuilding(buildingInfo);
    const uniqueFloors = Array.from(
      new Set(
        buildingData.flatMap((building) =>
          building.floorData
            .filter((item) => item.buildingID === buildingData[0].buildingID)
            .map((floor) => floor.floorName)
        )
      )
    );
    const uniqueRoom = Array.from(
      new Set(
        buildingData.flatMap((building) =>
          building.floorData
            .filter((item) => item.buildingID === buildingData[0].buildingID)
            .map((room) => room.roomName)
        )
      )
    ).map((item) => ({ key: item, value: item }));
    setFloor(uniqueFloors);
    setRoom(uniqueRoom);
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(floor);
    console.log(room);
  }, [data, buildingId]);

  const onBuildingChange = (e) => {
    const selectedBuildingId = parseInt(e.target.value);
    setBuildingId(selectedBuildingId);
    const uniqueFloors = Array.from(
      new Set(
        data.flatMap((building) =>
          building.floorData
            .filter((item) => {
              return item.buildingID === selectedBuildingId;
            })
            .map((floor) => floor.floorName)
        )
      )
    );
    const uniqueRoom = Array.from(
      new Set(
        buildingData.flatMap((building) =>
          building.floorData
            .filter((item) => {
              console.log(item.floorName);
              console.log(uniqueFloors[0]);
              return item.floorName === uniqueFloors[0];
            })
            .map((room) => room.roomName)
        )
      )
    ).map((item) => ({ key: item, value: item }));
    setRoom(uniqueRoom);
    console.log("Unique Rooms:", uniqueRoom);
    setFloor(uniqueFloors);
  };
  return (
    <div className="mt-[300px] section">
      <div>
        <label>
          Building:
          <select value={buildingId} onChange={onBuildingChange}>
            <option value="">Select a building</option>
            {building &&
              building.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Floor:
          <select value={floorId} onChange={(e) => setFloorId(e.target.value)}>
            <option value="">Select a floor</option>
            {floor.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Room:
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="">Select a room</option>
            {room.map((room) => (
              <option key={room.key} value={room.value}>
                {room.key}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
