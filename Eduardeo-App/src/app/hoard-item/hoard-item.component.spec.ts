import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoardItemComponent } from './hoard-item.component';

describe('HoardItemComponent', () => {
  let component: HoardItemComponent;
  let fixture: ComponentFixture<HoardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoardItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
