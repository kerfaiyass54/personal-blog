import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingArticleComponent } from './reading-article.component';

describe('ReadingArticleComponent', () => {
  let component: ReadingArticleComponent;
  let fixture: ComponentFixture<ReadingArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
