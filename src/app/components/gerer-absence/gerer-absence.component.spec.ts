import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererAbsenceComponent } from './gerer-absence.component';

describe('GererAbsenceComponent', () => {
  let component: GererAbsenceComponent;
  let fixture: ComponentFixture<GererAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GererAbsenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GererAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
