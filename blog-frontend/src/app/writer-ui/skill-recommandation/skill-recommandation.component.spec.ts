import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRecommandationComponent } from './skill-recommandation.component';

describe('SkillRecommandationComponent', () => {
  let component: SkillRecommandationComponent;
  let fixture: ComponentFixture<SkillRecommandationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillRecommandationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillRecommandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
