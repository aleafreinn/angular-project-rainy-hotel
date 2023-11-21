import { Component, OnInit } from '@angular/core';
import { Modifier, Room } from './room';

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
