import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSkillsComponent } from './check-skills.component';

describe('CheckSkillsComponent', () => {
  let component: CheckSkillsComponent;
  let fixture: ComponentFixture<CheckSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
