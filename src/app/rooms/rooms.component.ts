import { Component, OnInit } from '@angular/core';
import { Modifier, Room, RoomType } from './room';

@Component({
  selector: 'happ-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  // numberOfRooms = 10;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  roomsList: RoomType[] = [
    {
      roomNum: 1,
      roomType: 'Normal Room',
      amenities: 'Air Conditioner, Free Wi-Fi, Normal Shower.',
      price: 250,
    },
    {
      roomNum: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Deluxe Bed, Normal Shower.',
      price: 315,
    },
    {
      roomNum: 3,
      roomType: 'Private Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, TV, Kinig-Sized Bed, Shower & Bathtub, Kitchen.',
      price: 400,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  availableModifier: Modifier = {
    add: () =>
      this.rooms.availableRooms === this.rooms.totalRooms
        ? this.rooms.totalRooms
        : this.rooms.availableRooms++,
    remove: () =>
      this.rooms.availableRooms === 0 ? 0 : this.rooms.availableRooms--,
  };
}
