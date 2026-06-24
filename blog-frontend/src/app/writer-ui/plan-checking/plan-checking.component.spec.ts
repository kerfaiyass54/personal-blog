import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCheckingComponent } from './plan-checking.component';

describe('PlanCheckingComponent', () => {
  let component: PlanCheckingComponent;
  let fixture: ComponentFixture<PlanCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCheckingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
