import {Component} from '@angular/core';
import {Howl} from 'howler';
import {SharedService} from './shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  song = 'Loopster';
  public sound;
  public currTitle;
  public nowPlaying = 0;
  public titleArr = ['Loopster', 'Chill Wave', 'Aces High', 'Habanera',
    'Blue Feather', 'Canon in D Major', 'Android Sock Hop', 'Sunshine A', 'Happy Alley'];

  constructor(private sharedService: SharedService) { sharedService.changeEmitted$.subscribe(
    title => {
      this.prepareSong(title);
    });
  }

  previousSong(title) {
    for (let i = 0; i < this.titleArr.length; i++) {
      if (title === 'Loopster') {
        this.nowPlaying = 0;
        this.prepareSong('Happy Alley');
      } else if (title === this.titleArr[i]) {
        this.nowPlaying = 0;
        this.prepareSong(this.titleArr[i - 1]);
        break;
      }
    }
  }

  nextSong(title) {
    for (let i = 0; i < this.titleArr.length; i++) {
      if (title === 'Happy Alley') {
        this.nowPlaying = 0;
        this.prepareSong('Loopster');
      } else if (title === this.titleArr[i]) {
        this.nowPlaying = 0;
        this.prepareSong(this.titleArr[i + 1]);
        break;
      }
    }
  }

  prepareSong(title) {
    this.song = title;
    if (this.sound !== undefined) {
      if (title === this.currTitle) {
        if (this.nowPlaying === 1) {
          this.sound.pause();
          this.nowPlaying = 0;
        } else {
          this.sound.play();
          this.nowPlaying = 1;
        }
      } else {
        this.sound.stop();
        this.sound.unload();
        this.playSong(title);
      }
    } else {
      this.playSong(title);
    }
  }
  playSong(title) {
    const titleArr = this.titleArr;
    const newSong = (sTitle) => {
      this.nowPlaying = 0;
      this.prepareSong(sTitle);
    };
    this.sound = new Howl({
      src: ['assets/sounds/' + title + '.mp3'],
      html5: true,
      onend() {
        for (let i = 0; i < titleArr.length; i++) {
          if (title === 'Happy Alley') {
            newSong('Loopster');
          } else if (title === titleArr[i]) {
            newSong(titleArr[i + 1]);
            break;
          }
        }
      },
    });
    this.currTitle = title;
    this.sound.play();
    this.nowPlaying = 1;
  }

}
