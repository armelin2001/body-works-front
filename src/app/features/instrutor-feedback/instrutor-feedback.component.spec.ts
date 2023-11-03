import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrutorFeedbackComponent } from './instrutor-feedback.component';

describe('InstrutorFeedbackComponent', () => {
  let component: InstrutorFeedbackComponent;
  let fixture: ComponentFixture<InstrutorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrutorFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrutorFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
