import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemExercicioComponent } from './listagem-exercicio.component';

describe('ListagemExercicioComponent', () => {
  let component: ListagemExercicioComponent;
  let fixture: ComponentFixture<ListagemExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemExercicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
