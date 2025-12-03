import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterUiComponent } from './writer-ui.component';

describe('WriterUiComponent', () => {
  let component: WriterUiComponent;
  let fixture: ComponentFixture<WriterUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriterUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriterUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
