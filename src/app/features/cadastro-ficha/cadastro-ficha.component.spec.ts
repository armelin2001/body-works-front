import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFichaComponent } from './cadastro-ficha.component';

describe('CadastroFichaComponent', () => {
  let component: CadastroFichaComponent;
  let fixture: ComponentFixture<CadastroFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFichaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
