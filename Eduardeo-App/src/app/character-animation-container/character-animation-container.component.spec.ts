import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAnimationContainerComponent } from './character-animation-container.component';

describe('CharacterAnimationContainerComponent', () => {
  let component: CharacterAnimationContainerComponent;
  let fixture: ComponentFixture<CharacterAnimationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterAnimationContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterAnimationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
