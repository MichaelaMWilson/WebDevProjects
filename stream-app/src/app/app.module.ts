import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LibraryComponent} from './library/library.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {SharedService} from './shared-service';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
