import { Component } from '@angular/core';

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
export class AppComponent {
  title: string = 'hotelAppv13';

  role: string = 'Admin';

  roleSwitcher() {
    this.role = this.role === 'User' ? 'Admin' : 'User';
  }
}
