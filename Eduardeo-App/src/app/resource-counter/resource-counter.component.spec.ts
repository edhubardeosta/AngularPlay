import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCounterComponent } from './resource-counter.component';

describe('ResourceCounterComponent', () => {
  let component: ResourceCounterComponent;
  let fixture: ComponentFixture<ResourceCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
