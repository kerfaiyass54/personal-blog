import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFlashcardsComponent } from './check-flashcards.component';

describe('CheckFlashcardsComponent', () => {
  let component: CheckFlashcardsComponent;
  let fixture: ComponentFixture<CheckFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckFlashcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
