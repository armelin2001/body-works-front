import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEquipamentoComponent } from './cadastro-equipamento.component';

describe('CadastroEquipamentoComponent', () => {
  let component: CadastroEquipamentoComponent;
  let fixture: ComponentFixture<CadastroEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
