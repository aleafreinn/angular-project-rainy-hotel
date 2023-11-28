import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomsService } from '../rooms/services/rooms.service';
import { RoomType } from '../rooms/room';

@Component({
  selector: 'happ-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  @Input() rooms: RoomType[] = [];
  @Output() modifiedRooms = new EventEmitter<RoomType[]>();

  newRoom: FormGroup = new FormGroup({
    // roomNum: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    amenities: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    ratings: new FormControl('', Validators.required),
  });

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {}

  onSubmit() {
    let totalId: number = this.rooms.length + 1;

    const roomToAdd: RoomType = {
      id: totalId,
      roomNum: totalId,
      roomType: this.newRoom.get('roomType')?.value,
      amenities: this.newRoom.get('amenities')?.value,
      price: this.newRoom.get('price')?.value,
      date: new Date(),
      ratings: this.newRoom.get('ratings')?.value,
    };
    this.roomsService.addRoom(roomToAdd).subscribe((data) => {
      this.rooms = [...this.rooms, data];
      console.log(this.rooms);
      console.log(data);
    });
    this.modifiedRooms.emit(this.rooms);
  }
}
