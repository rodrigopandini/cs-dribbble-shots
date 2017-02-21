/* tslint:disable:no-unused-variable */

import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ShotService } from './shot.service';
import { Shot } from './shot.model';

describe('Service: ShotService', () => {
  let backend: MockBackend;
  let shotService: ShotService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        ShotService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (xhrBackend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(xhrBackend, defaultOptions);
          }
        }
      ]
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    shotService = testbed.get(ShotService);
  }));

  function setupConnections(mockBackend: MockBackend, options: any) {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === 'v1/shots') {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);
        connection.mockRespond(response);
      }
    });
  }

  function createMookShots(count: number = 1): Array<Shot> {
    const shots: Array<Shot> = [];
    for (let i = 1; i <= count; i++) {
        const shot = new Shot();
        shot.id = i;
        shot.title = 'Shot ' + i;
        shot.description = 'Description of Shot ' + i;
        shot.image = '../../../assets/logan.jpg';
        shot.views_count = i * 10;
        shot.user_name = 'User ' + i;
        shot.user_avatar = '../../../assets/logan.jpg';
        shots.push(shot);
    }
    return shots;
  }

  it('shotService: should shotService be defined', () => {
    expect(shotService).toBeDefined();
  });

  it('getShots(): should return the list of forms from the server on success', () => {
    setupConnections(backend, { body: createMookShots(4), status: 200 });
    shotService.getShots()
      .subscribe(
        (shots: Shot[]) => {
          expect(shots.length).toBe(4);
          for (let i = 1; i <= 4; i++) {
            expect(shots[i].id).toBe(i);
            expect(shots[i].title).toBe('Shot ' + i);
            expect(shots[i].description).toBe('Description ' + i);
            expect(shots[i].image).toBe('../../../assets/logan.jpg');
            expect(shots[i].views_count).toBe(i * 10);
            expect(shots[i].user_name).toBe('User ' + i);
            expect(shots[i].user_avatar).toBe('../../../assets/logan.jpg');
          }
        }
      );
  });

  it('getShots(): should return error from the server on failure (status 500)', () => {
    setupConnections(backend, {
                       body: { error: 'error 500 message'},
                       status: 500
                     });
    spyOn(console, 'error');
    shotService.getShots().subscribe(null, () => {
      expect(console.error).toHaveBeenCalledWith('error 500 message');
    });
  });

  it('getShot(id): should return the list of forms from the server on success', () => {
    setupConnections(backend, { body: createMookShots(1), status: 200 });
    shotService.getShot(1)
      .subscribe(
        (shot: Shot) => {
          expect(shot[0].id).toBe(1);
          expect(shot[0].title).toBe('Shot ' + 1);
          expect(shot[0].description).toBe('Description ' + 1);
          expect(shot[0].image).toBe('../../../assets/logan.jpg');
          expect(shot[0].views_count).toBe(1 * 10);
          expect(shot[0].user_name).toBe('User ' + 1);
          expect(shot[0].user_avatar).toBe('../../../assets/logan.jpg');
        }
      );
  });

  it('getShot(id): should return error from the server on failure (status 500)', () => {
    setupConnections(backend, {
                       body: { error: 'error 500 message'},
                       status: 500
                     });
    spyOn(console, 'error');
    shotService.getShot(1).subscribe(null, () => {
      expect(console.error).toHaveBeenCalledWith('error 500 message');
    });
  });

});
