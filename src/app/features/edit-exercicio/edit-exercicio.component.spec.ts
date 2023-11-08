import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExercicioComponent } from './edit-exercicio.component';

describe('EditExercicioComponent', () => {
  let component: EditExercicioComponent;
  let fixture: ComponentFixture<EditExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExercicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
