import { Component, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

import { ShotService } from '../shared/shot.service';
import { Shot } from '../shared/shot.model';

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css'],
})
export class ShotListComponent implements OnInit {
  errorMessage: string;
  shots: Shot[];

  constructor (private shotService: ShotService,
               private sanitizer: DomSanitizer) { }

  /**
  * Make a call to getShots() to get the most popular shots
  */
  ngOnInit() {
    this.getShots();
  }

  /**
  * Get the most popular shots.
  * @returns Returns a list of the shots.
  */
  getShots() {
    this.shotService.getShots()
                      .subscribe(
                        shots => this.shots = shots,
                        error => this.errorMessage = <any>error);
  }

  /**
  * Get the image url of the shot.
  * @param Shot The shot object.
  * @returns    Returns a string formated with the image url of the shot.
  */
  getImage(shot: Shot) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${shot.image})`);
  }
}
