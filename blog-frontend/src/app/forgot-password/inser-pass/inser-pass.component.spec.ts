import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserPassComponent } from './inser-pass.component';

describe('InserPassComponent', () => {
  let component: InserPassComponent;
  let fixture: ComponentFixture<InserPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
