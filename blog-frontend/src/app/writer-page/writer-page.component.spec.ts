import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterPageComponent } from './writer-page.component';

describe('WriterPageComponent', () => {
  let component: WriterPageComponent;
  let fixture: ComponentFixture<WriterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
