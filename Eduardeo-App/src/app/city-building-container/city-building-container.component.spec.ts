import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBuildingContainerComponent } from './city-building-container.component';

describe('CityBuildingContainerComponent', () => {
  let component: CityBuildingContainerComponent;
  let fixture: ComponentFixture<CityBuildingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityBuildingContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityBuildingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
