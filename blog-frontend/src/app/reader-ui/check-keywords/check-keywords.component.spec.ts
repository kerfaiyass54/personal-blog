import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckKeywordsComponent } from './check-keywords.component';

describe('CheckKeywordsComponent', () => {
  let component: CheckKeywordsComponent;
  let fixture: ComponentFixture<CheckKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckKeywordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
