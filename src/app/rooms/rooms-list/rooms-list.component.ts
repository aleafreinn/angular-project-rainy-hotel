import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { RoomType } from '../room';

@Component({
  selector: 'happ-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
})
export class RoomsListComponent implements OnInit, OnChanges {
  @Input() rooms: RoomType[] = [];
  @Input() title: string = '';
  @Output() roomSelected = new EventEmitter<RoomType>();
  @Output() changeCounter = new EventEmitter<number>();

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
}
