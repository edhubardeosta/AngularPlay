import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBuildingStageComponent } from './city-building-stage.component';

describe('CityBuildingStageComponent', () => {
  let component: CityBuildingStageComponent;
  let fixture: ComponentFixture<CityBuildingStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityBuildingStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityBuildingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
