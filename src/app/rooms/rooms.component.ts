import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges,
  Self,
  SkipSelf,
  OnDestroy,
} from '@angular/core';
import { Modifier, Room, RoomType } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'happ-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [RoomsService],
})
export class RoomsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
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

  toggleList: boolean = false;

  totalBytes: number = 0;

  // to save an active subscription, we can unsubscribe to a destroyed
  // component with denoting the "Subscription" interface:
  subscription!: Subscription;

  // Working with async pipes:

  // Error handling to be studied further
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  roomsList$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  anoRoomsList$ = this.roomsService.getRooms$.pipe(
    map((roomList) =>
      roomList.map((room) => {
        return { ...room, date: new Date(room.date) };
      })
    )
  );

  // stream = new Observable((observer) => {
  //   observer.next('user1'); // whenever you call a next observable, it will emitting
  //   // a new data. So whoever subscribe to this stream, will get this data.
  //   observer.next('user2');
  //   observer.next('user3');

  //   observer.complete(); // every stream will finish somewhere, in this case,
  //   // calling this dot operator will complete the stream.
  //   observer.error('error'); // in case there is an error
  // });

  // in order to access the component without using and only the purpose of
  // viewing the component, we can use this ViewChild decorator.
  @ViewChild(HeaderComponent, { static: true })
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) HeaderChildren!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomsService: RoomsService) {}

  ngOnInit(): void {
    // console.log(this.rooms$); // this will log as an observable.
    this.roomListTitle = 'List of Rooms';

    // this.stream.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('complete'),
    //   error: (err) => console.log(err),
    // });

    // this.stream.subscribe((data) => console.log(data));

    // this.subscription = this.roomsService.getRooms$.subscribe((roomsList) => {
    //   this.roomsList = roomsList.map((room) => {
    //     return { ...room, date: new Date(room.date) };
    //   });
    // });

    // httpRequest:

    this.roomsService.getPhotos().subscribe((event) => {
      console.log(event);
      // instead of denoting the variable as "data", it will more suitable
      // to name it as "event" due to the variable acts as event rather than
      // a data.

      // it acts as a loader, beneficial for user interactions.

      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          // need to show how much data is loaded
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          // the properties can be obtained from an API
          break;
        }
      }
    });

    // If we tried to access the headerComponent properties, we will get
    // undefined due to the headerComponent's ngOnInit is currently being
    // built at the time.
    // console.log(this.headerComponent);
    // In order to view it properly, we need to use AfterViewInit hook or
    // set the "static" property to true.
  }

  ngAfterViewInit() {
    // console.log(this.headerComponent);
    this.headerComponent.titleName = 'Rain Roomie Hotel';

    // console.log(this.HeaderChildren);
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
      id: this.roomsList[this.roomsList.length - 1].roomNum + 1,
      roomNum: this.roomsList[this.roomsList.length - 1].roomNum + 1,
      roomType: 'Private Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, TV, King-Sized Bed, Shower & Bathtub, Kitchen.',
      price: 400,
      date: new Date('2023-12-16'),
      ratings: 14.458284,
    };

    // this.roomsList = [...this.roomsList, defaultRoom];
    this.subscription = this.roomsService
      .addRoom(defaultRoom)
      .subscribe((data) => {
        this.roomsList = [...this.roomsList, data];
      });
  }

  editRooms(roomTarget: RoomType) {
    // console.log(roomTarget);
    this.subscription = this.roomsService
      .editRoom(roomTarget)
      .subscribe((data) => {
        this.roomsList = this.roomsList.map((room) => {
          if (room.id === data.id) {
            return { ...data };
          } else return room;
        });
        console.log(this.roomsList);
      });
  }

  deleteRoom(roomTarget: RoomType) {
    const deleteId = roomTarget.id;
    this.subscription = this.roomsService
      .deleteRoom(roomTarget)
      .subscribe((data) => {
        this.roomsList = this.roomsList.filter((room) => {
          return room.id !== deleteId;
        });
      });
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

  // So, every destroyed component will get unsubscribe for the active ones.
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
