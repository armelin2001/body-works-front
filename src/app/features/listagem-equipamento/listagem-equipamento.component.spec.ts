import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemEquipamentoComponent } from './listagem-equipamento.component';

describe('ListagemEquipamentoComponent', () => {
  let component: ListagemEquipamentoComponent;
  let fixture: ComponentFixture<ListagemEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
