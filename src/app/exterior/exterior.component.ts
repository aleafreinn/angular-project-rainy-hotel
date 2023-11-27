import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'happ-exterior',
  templateUrl: './exterior.component.html',
  styleUrls: ['./exterior.component.scss'],
  // providers: [RoomsService],
})
export class ExteriorComponent implements OnInit {
  empName: string = 'John';

  constructor(/* @Self() private roomsService: RoomsService */) {}

  ngOnInit(): void {}
}
