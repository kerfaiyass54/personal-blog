import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckArticlesComponent } from './check-articles.component';

describe('CheckArticlesComponent', () => {
  let component: CheckArticlesComponent;
  let fixture: ComponentFixture<CheckArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
