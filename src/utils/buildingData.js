export const treeData = [
  { roomId: "10001" },
  { roomId: "10002" },
  { roomId: "10003" },
  { roomId: "10004" },
  { roomId: "10005" },
  { roomId: "10006" },
  { roomId: "10007" },
  { roomId: "10008" },
  { roomId: "10009" },
];

export const myTreeData = [
  {
    buildingId: "100",
    children: [
      {
        floor: "1",
        children: [
          { roomId: "10001" },
          { roomId: "10002" },
          { roomId: "10003" },
        ],
      },
      {
        floor: "2",
        children: [
          { roomId: "10003" },
          { roomId: "10004" },
          { roomId: "10005" },
        ],
      },
    ],
  },
  {
    buildingId: "101",
    children: [
      {
        floor: "3",
        children: [
          { roomId: "10006" },
          { roomId: "10007" },
          { roomId: "10008" },
        ],
      },
      {
        floor: "4",
        children: [
          { roomId: "10009" },
          { roomId: "10010" },
        ],
      },
    ],
  },
  {
    buildingId: "103",
    children: [
      {
        floor: "4",
        children: [
          { roomId: "10011" },
          { roomId: "10011" },
          { roomId: "10011" },
        ],
      },
      {
        floor: "5",
        children: [
          { roomId: "10011" },
        ],
      },
    ],
  },
];

export const buildingData = [
  {
    buildingName: "building1",
    buildingID: 1,
    floorData: [
      {
        buildingID: 1,
        floorName: "-1",
        roomName: "401",
      },
      {
        buildingID: 1,
        floorName: "2",
        roomName: "201",
      },
      {
        buildingID: 1,
        floorName: "2",
        roomName: "202",
      },
      {
        buildingID: 1,
        floorName: "3",
        roomName: "601",
      },
      {
        buildingID: 1,
        floorName: "3",
        roomName: "601",
      },
    ],
  },
  {
    buildingName: "building2",
    buildingID: 2,
    floorData: [
      {
        buildingID: 2,
        floorName: "5",
        roomName: "713",
      },
      {
        buildingID: 2,
        floorName: "5",
        roomName: "712",
      },
      {
        buildingID: 2,
        floorName: "5",
        roomName: "711",
      },
      {
        buildingID: 2,
        floorName: "4",
        roomName: "701",
      },
      {
        buildingID: 2,
        floorName: "4",
        roomName: "801",
      },
    ],
  },
];
