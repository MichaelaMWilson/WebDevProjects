import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {SharedService} from '../shared-service';

@Component({
  providers: [AppComponent],
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(private sharedService: SharedService) {}

  songEvent(title) {
    this.sharedService.emitChange(title);
  }

  ngOnInit() {
  }

}
