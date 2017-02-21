import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DomSanitizer  } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { Observable } from 'rxjs'; // tslint:disable-line
import { MaterialModule } from '@angular/material';

import { Shot } from '../shared/shot.model';
import { ShotService } from '../shared/shot.service';

import { ShotListComponent } from './shot-list.component';

class ShotServiceMock {
  private createMookShots(count: number = 1): Array<Shot> {
    const shots: Shot[] = [];
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

  getShots(): Observable<Shot[]> {
    return <Observable<Shot[]>>Observable.from([ this.createMookShots(10) ]);
  }
}

describe('ShotListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShotListComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: ShotService, useClass: ShotServiceMock },
        { provide: DomSanitizer, useClass: DomSanitizer }
      ]
    });
  });

  it('should create the component', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotListComponent);
      const comp = fixture.componentInstance;

      expect(comp).toBeTruthy();
    });
  }));

  it('should initially have no shot', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotListComponent);
      const comp = fixture.componentInstance;

      expect(comp.shots).toBeUndefined();
    });
  }));

  it('should initially have no errorMessage', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotListComponent);
      const comp = fixture.componentInstance;

      expect(comp.errorMessage).toBeUndefined();
    });
  }));

  describe('OnInit', () => {
    it('should get the shot', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(ShotListComponent);
        const comp = fixture.componentInstance;

        comp.ngOnInit();

        expect(comp.shots[0].id).toBe(1);
        expect(comp.shots[0].title).toBe('Shot 1');
        expect(comp.shots[0].description).toBe('Description of Shot 1');
        expect(comp.shots[0].image).toBe('../../../assets/logan.jpg');
        expect(comp.shots[0].views_count).toBe(10);
        expect(comp.shots[0].user_name).toBe('User 1');
        expect(comp.shots[0].user_avatar).toBe('../../../assets/logan.jpg');
      });
    }));
  });

  describe('#getImage', () => {
    it('should get the shot avatar style', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(ShotListComponent);
        const comp = fixture.componentInstance;

        comp.ngOnInit();

        expect(comp.shots[0].user_avatar).toBe('../../../assets/logan.jpg');
      });
    }));
  });

});
