import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSummariesComponent } from './check-summaries.component';

describe('CheckSummariesComponent', () => {
  let component: CheckSummariesComponent;
  let fixture: ComponentFixture<CheckSummariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckSummariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSummariesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
