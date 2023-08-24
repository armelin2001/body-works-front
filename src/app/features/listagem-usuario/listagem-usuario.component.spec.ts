import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemUsuarioComponent } from './listagem-usuario.component';

describe('ListagemUsuarioComponent', () => {
  let component: ListagemUsuarioComponent;
  let fixture: ComponentFixture<ListagemUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
