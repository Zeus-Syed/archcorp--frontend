import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchcorpComponent } from './archcorp.component';

describe('ArchcorpComponent', () => {
  let component: ArchcorpComponent;
  let fixture: ComponentFixture<ArchcorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchcorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchcorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
