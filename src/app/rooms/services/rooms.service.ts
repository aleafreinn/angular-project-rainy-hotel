import { Inject, Injectable } from '@angular/core';
import { RoomType } from '../room';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomsList: RoomType[] = [
    {
      roomNum: 1,
      roomType: 'Normal Room',
      amenities: 'Air Conditioner, Free Wi-Fi, Normal Shower.',
      price: 250,
      date: new Date('2023-10-30'), //for learning purposes only
      // date: '2023-10-30',
      ratings: 1.264056,
    },
    {
      roomNum: 2,
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Deluxe Bed, Normal Shower.',
      price: 315,
      date: new Date('2023-11-04'),
      // date: '2023-10-30',
      ratings: 3.64963,
    },
    {
      roomNum: 3,
      roomType: 'Private Room',
      amenities:
        'Air Conditioner, Free Wi-Fi, TV, King-Sized Bed, Shower & Bathtub, Kitchen.',
      price: 400,
      date: new Date('2023-12-16'),
      // date: '2023-10-30',
      ratings: 14.458284,
    },
  ];

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndPoint);
  }

  getRooms() {
    return this.http.get<RoomType[]>(`${environment.apiEndpoint}/roomsList`);
  }
}
