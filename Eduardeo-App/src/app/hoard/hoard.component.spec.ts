import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoardComponent } from './hoard.component';

describe('HoardComponent', () => {
  let component: HoardComponent;
  let fixture: ComponentFixture<HoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
