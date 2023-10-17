import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaUsuarioComponent } from './ficha-usuario.component';

describe('FichaUsuarioComponent', () => {
  let component: FichaUsuarioComponent;
  let fixture: ComponentFixture<FichaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
