import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoListComponent } from './lista-equipamentos.component';

describe('ListaEquipamentosComponent', () => {
  let component: EquipamentoListComponent;
  let fixture: ComponentFixture<EquipamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipamentoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
