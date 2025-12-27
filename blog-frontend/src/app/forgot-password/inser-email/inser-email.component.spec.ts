import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserEmailComponent } from './inser-email.component';

describe('InserEmailComponent', () => {
  let component: InserEmailComponent;
  let fixture: ComponentFixture<InserEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
