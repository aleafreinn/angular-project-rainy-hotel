import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { RoomType } from '../room';

@Component({
  selector: 'happ-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomType[] | null = [];
  @Input() title: string = '';
  @Output() roomSelected = new EventEmitter<RoomType>();
  @Output() changeCounter = new EventEmitter<number>();
  @Output() roomToEdit = new EventEmitter<RoomType>();
  @Output() roomToDelete = new EventEmitter<RoomType>();

  countChange: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    if (changes['title']) {
      this.countChange++;
      this.title = changes['title'].currentValue.toUpperCase();
      this.changeCounter.emit(this.countChange);
    }
  }

  ngOnInit(): void {}

  selectRoom(room: RoomType) {
    this.roomSelected.emit(room);
  }

  editRoom(room: RoomType) {
    const newRoom: RoomType = { ...room, date: new Date() };
    this.roomToEdit.emit(newRoom);
  }

  deleteRoom(room: RoomType) {
    this.roomToDelete.emit(room);
  }

  ngOnDestroy() {
    console.log('the list has been disabled.');
  }
}
