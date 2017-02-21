import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Shot } from '../shared/shot.model';
import { ShotService } from '../shared/shot.service';

@Component({
  selector: 'app-shot',
  templateUrl: './shot.component.html',
  styleUrls: ['./shot.component.css']
})
export class ShotComponent implements OnInit {
  @Input() shot: Shot;
  errorMessage: string;

  constructor(private shotService: ShotService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  /**
  * Make a call to getShot(id) to get the shot
  * specify by the id param from router `shots/:id`
  */
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.shotService.getShot(+params['id']))
      .subscribe(shot => this.shot = shot,
                 error => this.errorMessage = <any>error);
  }

  /**
  * Get the url avatar of the author of the shot.
  * @returns Returns a string formated with the url avatar of the author of the shot.
  */
  getAvatarStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.shot.user_avatar}`);
  }

  /**
  * Get the formated description of a shot.
  * @returns Returns a string formated with the description of the shot.
  */
  getFormatedDescription() {
    return this.sanitizer.bypassSecurityTrustHtml(this.shot.description);
  }
}
