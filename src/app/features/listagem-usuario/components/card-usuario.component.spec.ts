import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsuarioAcademiaComponent } from './card-usuario.component';

describe('CardUsuarioAcademiaComponent', () => {
  let component: CardUsuarioAcademiaComponent;
  let fixture: ComponentFixture<CardUsuarioAcademiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUsuarioAcademiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUsuarioAcademiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
