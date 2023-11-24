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
      date: new Date('2023-10-30'), //for learning purposes only
      ratings: 1.2,
    },
    {
      roomNum: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Deluxe Bed, Normal Shower.',
      price: 315,
      date: new Date('2023-11-04'),
      ratings: 3.6,
    },
    {
      roomNum: 3,
      roomType: 'Private Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, TV, King-Sized Bed, Shower & Bathtub, Kitchen.',
      price: 400,
      date: new Date('2023-12-16'),
      ratings: 4.4,
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
