import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandationsPageComponent } from './recommandations-page.component';

describe('RecommandationsPageComponent', () => {
  let component: RecommandationsPageComponent;
  let fixture: ComponentFixture<RecommandationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommandationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommandationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
