import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioTreinoCoreComponent } from './usuario-treino-core.component';

describe('UsuarioTreinoCoreComponent', () => {
  let component: UsuarioTreinoCoreComponent;
  let fixture: ComponentFixture<UsuarioTreinoCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioTreinoCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioTreinoCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
