import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedArticlesComponent } from './saved-articles.component';

describe('SavedArticlesComponent', () => {
  let component: SavedArticlesComponent;
  let fixture: ComponentFixture<SavedArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
