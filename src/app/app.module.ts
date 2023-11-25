import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    RoomsComponent,
    HeaderComponent,
    RoomsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
