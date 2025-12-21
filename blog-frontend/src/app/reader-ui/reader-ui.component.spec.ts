import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderUiComponent } from './reader-ui.component';

describe('ReaderUiComponent', () => {
  let component: ReaderUiComponent;
  let fixture: ComponentFixture<ReaderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
imports: [ReaderUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
