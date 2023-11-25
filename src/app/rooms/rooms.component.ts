import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Modifier, Room, RoomType } from './room';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'happ-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // numberOfRooms = 10;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  roomListTitle: string = '';

  roomsList: RoomType[] = [];

  highlightedRoom!: RoomType;

  titleChangeCounter: number = 0;

  // in order to access the component without using and only the purpose of
  // viewing the component, we can use this ViewChild decorator.
  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  constructor() {}

  ngOnInit(): void {
    this.roomsList = [
      {
        roomNum: 1,
        roomType: 'Normal Room',
        amenities: 'Air Conditioner, Free Wi-Fi, Normal Shower.',
        price: 250,
        date: new Date('2023-10-30'), //for learning purposes only
        ratings: 1.264056,
      },
      {
        roomNum: 2,
        roomType: 'Deluxe Room',
        amenities:
          'Air Conditioner, Free Wi-Fi, TV, Deluxe Bed, Normal Shower.',
        price: 315,
        date: new Date('2023-11-04'),
        ratings: 3.64963,
      },
      {
        roomNum: 3,
        roomType: 'Private Room',
        amenities:
          'Air Conditioner, Free Wi-Fi, TV, King-Sized Bed, Shower & Bathtub, Kitchen.',
        price: 400,
        date: new Date('2023-12-16'),
        ratings: 14.458284,
      },
    ];
    this.roomListTitle = 'List of Rooms';

    // If we tried to access the headerComponent properties, we will get
    // undefined due to the headerComponent's ngOnInit is currently being
    // built at the time.
    // console.log(this.headerComponent);
    // In order to view it properly, we need to use AfterViewInit hook or
    // set the "static" property to true.
  }

  ngAfterViewInit() {
    console.log(this.headerComponent);
    this.headerComponent.titleName = 'Rain Roomie Hotel';
  }

  ngAfterViewChecked() {}

  availableModifier: Modifier = {
    add: () =>
      this.rooms.availableRooms === this.rooms.totalRooms
        ? this.rooms.totalRooms
        : this.rooms.availableRooms++,
    remove: () =>
      this.rooms.availableRooms === 0 ? 0 : this.rooms.availableRooms--,
  };

  selectRoom(room: RoomType) {
    console.log(room);
    this.highlightedRoom = room;
  }

  addRooms() {
    const defaultRoom: RoomType = {
      roomNum: 3,
      roomType: 'Private Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, TV, King-Sized Bed, Shower & Bathtub, Kitchen.',
      price: 400,
      date: new Date('2023-12-16'),
      ratings: 14.458284,
    };

    this.roomsList = [...this.roomsList, defaultRoom];
  }

  roomTitleHandler() {
    this.roomListTitle =
      this.roomListTitle === 'List of Rooms'
        ? 'Rooms of List'
        : 'List of Rooms';
  }

  setChangeCounter(counter: number) {
    this.titleChangeCounter = counter;
  }
}
