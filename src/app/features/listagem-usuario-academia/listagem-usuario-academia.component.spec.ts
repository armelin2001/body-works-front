import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemUsuarioAcademiaComponent } from './listagem-usuario-academia.component';

describe('ListagemUsuarioAcademiaComponent', () => {
  let component: ListagemUsuarioAcademiaComponent;
  let fixture: ComponentFixture<ListagemUsuarioAcademiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemUsuarioAcademiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemUsuarioAcademiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
