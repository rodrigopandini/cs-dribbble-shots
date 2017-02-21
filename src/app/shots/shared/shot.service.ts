import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Shot } from './shot.model';

@Injectable()
export class ShotService {
  private url = 'https://api.dribbble.com/v1';
  private token = '523956f95976a4ec8b9cd9f17a86d314126a1e1261a767e7e6465ccb8bcc6ccf';

  constructor (private http: Http) { }

  /**
   * Get the Shot by id.
   * @param id The id of shot to be get.
   * @returns  Returns a Observable object of type <Shot>.
   */
  getShot(id: number): Observable<Shot> {
    const url = `${this.url}/shots/${id}`;
    const headers = new Headers({ 'Authorization': `Bearer ${this.token}` });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
   * Get a list of most popular Shots.
   * @returns Returns a Observable object of type <Shot[]> (array of Shots).
   */
  getShots(): Observable<Shot[]> {
    const url = `${this.url}/shots?&per_page=100`;
    const headers = new Headers({ 'Authorization': `Bearer ${this.token}` });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map(this.extractDataList)
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    const body = res.json();
    const shot: Shot = new Shot();
    shot.id = body.id;
    shot.title = body.title;
    shot.description = body.description;
    shot.image = body.images.hidpi || body.images.normal;
    shot.views_count = body.views_count;
    shot.user_name = body.user.name;
    shot.user_avatar = body.user.avatar_url;

    return shot;
  }

  private extractDataList(res: Response) {
    return res.json().map((body) => {
      const shot: Shot = new Shot();
      shot.id = body.id;
      shot.title = body.title;
      shot.image = body.images.teaser || body.images.normal;
      shot.views_count = body.views_count;

      return shot;
    });
  }
}
