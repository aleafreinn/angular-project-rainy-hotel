export interface Room {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface Modifier {
  add(): void;
  remove(): void;
}
