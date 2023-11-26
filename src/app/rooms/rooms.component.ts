import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Modifier, Room, RoomType } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';

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

  toggleList: boolean = true;

  // in order to access the component without using and only the purpose of
  // viewing the component, we can use this ViewChild decorator.
  @ViewChild(HeaderComponent, { static: true })
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) HeaderChildren!: QueryList<HeaderComponent>;

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomListTitle = 'List of Rooms';

    this.roomsService.getRooms().subscribe((roomsList) => {
      this.roomsList = roomsList.map((room) => {
        return { ...room, date: new Date(room.date) };
      });
    });

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

    console.log(this.HeaderChildren);
    // dirty: defines where the component has been changed or not
    // first: first instance
    // last: last instance.
    // this.HeaderChildren.first.titleName = 'this is a first title.';
    this.HeaderChildren.last.titleName = 'this is a last title.';
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
      date: new Date(2023 - 12 - 16),
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

  toggleListHandler() {
    this.toggleList = !this.toggleList;
  }
}
