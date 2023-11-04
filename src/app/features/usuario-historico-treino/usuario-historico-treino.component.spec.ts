import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioHistoricoTreinoComponent } from './usuario-historico-treino.component';

describe('UsuarioHistoricoTreinoComponent', () => {
  let component: UsuarioHistoricoTreinoComponent;
  let fixture: ComponentFixture<UsuarioHistoricoTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioHistoricoTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioHistoricoTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
