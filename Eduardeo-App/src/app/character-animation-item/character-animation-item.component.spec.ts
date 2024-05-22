import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAnimationItemComponent } from './character-animation-item.component';

describe('CharacterAnimationItemComponent', () => {
  let component: CharacterAnimationItemComponent;
  let fixture: ComponentFixture<CharacterAnimationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterAnimationItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterAnimationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
