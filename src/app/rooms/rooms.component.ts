import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'happ-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  numberOfRooms = 10;

  constructor() {}

  ngOnInit(): void {}
}
