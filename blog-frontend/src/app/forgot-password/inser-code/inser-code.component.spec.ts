import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserCodeComponent } from './inser-code.component';

describe('InserCodeComponent', () => {
  let component: InserCodeComponent;
  let fixture: ComponentFixture<InserCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
