import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersPagesComponent } from './characters-pages.component';

describe('CharactersPagesComponent', () => {
  let component: CharactersPagesComponent;
  let fixture: ComponentFixture<CharactersPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
