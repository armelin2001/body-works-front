import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEquipamentosComponent } from './lista-equipamentos.component';

describe('ListaEquipamentosComponent', () => {
  let component: ListaEquipamentosComponent;
  let fixture: ComponentFixture<ListaEquipamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEquipamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEquipamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
