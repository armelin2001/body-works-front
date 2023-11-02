import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTreinoComponent } from './usuario-treino.component';

describe('UsuarioTreinoComponent', () => {
  let component: UsuarioTreinoComponent;
  let fixture: ComponentFixture<UsuarioTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
