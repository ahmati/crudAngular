import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCComponent } from './new-c.component';

describe('NewCComponent', () => {
  let component: NewCComponent;
  let fixture: ComponentFixture<NewCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
