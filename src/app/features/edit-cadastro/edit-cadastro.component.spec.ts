import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCadastroComponent } from './edit-cadastro.component';

describe('EditCadastroComponent', () => {
  let component: EditCadastroComponent;
  let fixture: ComponentFixture<EditCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
