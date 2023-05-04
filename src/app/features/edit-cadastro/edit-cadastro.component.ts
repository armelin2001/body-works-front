import { Component, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-cadastro',
  templateUrl: './edit-cadastro.component.html',
  styleUrls: ['./edit-cadastro.component.scss']
})
export class EditCadastroComponent {
  selectedGender = '';

  constructor(private location: Location, private cdr: ChangeDetectorRef) {}

  goBack(): void {
    this.location.back();
  }

  selectGender(gender: string): void {
    this.selectedGender = gender;
    this.cdr.detectChanges();
  }
}
