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

import { ShotComponent } from './shot.component';

class ShotServiceMock {
  getShot(id: number = 1): Observable<Shot> {
    const shot = new Shot();
    shot.id = id;
    shot.title = 'Shot ' + id;
    shot.description = 'Description of Shot ' + id;
    shot.image = '../../../assets/logan.jpg';
    shot.views_count = id * 10;
    shot.user_name = 'User ' + id;
    shot.user_avatar = '../../../assets/logan.jpg';

    return <Observable<Shot>>Observable.from([ shot ]);
  }
}

describe('ShotComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShotComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: ShotService, useClass: ShotServiceMock },
        { provide: ActivatedRoute, useValue: { params: Observable.of({id: 1})} },
        { provide: DomSanitizer, useClass: DomSanitizer }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
  });

  it('should create the component', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotComponent);
      const comp = fixture.componentInstance;

      expect(comp).toBeTruthy();
    });
  }));

  it('should initially have no shot', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotComponent);
      const comp = fixture.componentInstance;

      expect(comp.shot).toBeUndefined();
    });
  }));

  it('should initially have no errorMessage', async(() => {
    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(ShotComponent);
      const comp = fixture.componentInstance;

      expect(comp.errorMessage).toBeUndefined();
    });
  }));

  describe('OnInit', () => {
    it('should get the shot (1)', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(ShotComponent);
        const comp = fixture.componentInstance;

        comp.ngOnInit();

        expect(comp.shot.id).toBe(1);
      });
    }));
  });

  describe('#getAvatarStyle', () => {
    it('should get the shot avatar style', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(ShotComponent);
        const comp = fixture.componentInstance;

        expect(comp.shot).toBeUndefined();

        comp.ngOnInit();
        comp.getAvatarStyle();

        expect(comp.shot.user_avatar).toBe('../../../assets/logan.jpg');
      });
    }));
  });

  describe('#getFormatedDescription', () => {
    it('should get the shot formated description', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(ShotComponent);
        const comp = fixture.componentInstance;

        expect(comp.shot).toBeUndefined();

        comp.ngOnInit();
        comp.getFormatedDescription();

        expect(comp.shot.description).toBe('Description of Shot 1');
      });
    }));
  });

});
