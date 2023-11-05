import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExercicioComponent } from './card-exercicio.component';

describe('CardExercicioComponent', () => {
  let component: CardExercicioComponent;
  let fixture: ComponentFixture<CardExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExercicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
