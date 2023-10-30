import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicioTreinoComponent } from './exercicio-treino.component';

describe('ExercicioTreinoComponent', () => {
  let component: ExercicioTreinoComponent;
  let fixture: ComponentFixture<ExercicioTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicioTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicioTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
