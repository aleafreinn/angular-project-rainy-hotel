import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Optional,
  Inject,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { localStorageToken } from './localstorage.token';
import { LoggerService } from './logger.service';

@Component({
  selector: 'happ-root',
  templateUrl: './app.component.html',
  // template: `
  //   <main>
  //     <h2>Using Angular with inline template!</h2>
  //   </main>
  // `,
  styleUrls: ['./app.component.scss'],
  // styles: [
  //   `
  //     h2 {
  //       color: #ffff88;
  //     }
  //   `,
  //   `
  //     main {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       height: 100vh;
  //     }
  //   `,
  // ],
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string = 'hotelAppv13';

  role: string = 'Admin';

  // the "ViewContainerRef" will give some reference based on
  // the stated container. It will dynamically load the component.
  @ViewChild('adminRef', { read: ViewContainerRef })
  adminRef!: ViewContainerRef;
  @ViewChild('userRef', { read: ViewContainerRef }) userRef!: ViewContainerRef;

  @ViewChild('myTitle', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  ngOnInit() {
    // console.log(this.name);
    this.name.nativeElement.innerHTML =
      '<h2>Hello, im from native element.</h2>';
    this.localStorage.setItem('name', 'Local Rain Hotel');
  }

  ngAfterViewInit() {
    const adminComponentRef = this.adminRef.createComponent(RoomsComponent);
    adminComponentRef.instance.rooms.totalRooms = 25;
    const userComponentRef = this.userRef.createComponent(MyComponentComponent);
  }

  roleSwitcher() {
    this.role = this.role === 'user' ? 'admin' : 'user';
  }
}
