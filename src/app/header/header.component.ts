import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'happ-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  titleName: string = 'Rainy Ang Hotel';
  titleVisibility: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.titleVisibility = !this.titleVisibility;
  }
}
