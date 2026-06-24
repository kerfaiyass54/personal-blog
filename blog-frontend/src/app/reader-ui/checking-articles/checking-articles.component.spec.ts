import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingArticlesComponent } from './checking-articles.component';

describe('CheckingArticlesComponent', () => {
  let component: CheckingArticlesComponent;
  let fixture: ComponentFixture<CheckingArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckingArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckingArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
