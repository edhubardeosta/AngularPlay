import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityContainerComponent } from './city-container.component';

describe('CityContainerComponent', () => {
  let component: CityContainerComponent;
  let fixture: ComponentFixture<CityContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
