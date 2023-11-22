export interface Room {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface Modifier {
  add(): void;
  remove(): void;
}

export interface RoomType {
  roomNum: number;
  roomType: string;
  amenities: string;
  price: number;
}
