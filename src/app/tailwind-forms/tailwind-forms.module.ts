import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { TailwindCheckboxComponent } from './components/tailwind-checkbox/tailwind-checkbox.component';
import { TailwindDatepickerComponent } from './components/tailwind-datepicker/tailwind-datepicker.component';
import { TailwindDropdownComponent } from './components/tailwind-dropdown/tailwind-dropdown.component';
import { TailwindInputComponent } from './components/tailwind-input/tailwind-input.component';
import { TailwindRadioListDescriptionPanelComponent } from './components/tailwind-radio-list-description-panel/tailwind-radio-list-description-panel.component';
import { TailwindSelectMultipleComponent } from './components/tailwind-select-multiple/tailwind-select-multiple.component';
import { TailwindSelectComponent } from './components/tailwind-select/tailwind-select.component';
import { TailwindSubmitButtonComponent } from './components/tailwind-submit-button/tailwind-submit-button.component';
import { TailwindTimepickerComponent } from './components/tailwind-timepicker/tailwind-timepicker.component';
import { TailwindToggleButtonComponent } from './components/tailwind-toggle-button/tailwind-toggle-button.component';
import { TailwindToggleComponent } from './components/tailwind-toggle/tailwind-toggle.component';
import { TailwindFormsService } from './services/tailwind-forms.service';

@NgModule({
  declarations: [
    TailwindInputComponent,
    TailwindSubmitButtonComponent,
    TailwindRadioListDescriptionPanelComponent,
    TailwindTimepickerComponent,
    TailwindDatepickerComponent,
    TailwindSelectComponent,
    TailwindDropdownComponent,
    TailwindCheckboxComponent,
    TailwindSelectMultipleComponent,
    TailwindToggleComponent,
    TailwindToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    TailwindInputComponent,
    TailwindSubmitButtonComponent,
    TailwindRadioListDescriptionPanelComponent,
    TailwindTimepickerComponent,
    TailwindDatepickerComponent,
    TailwindSelectComponent,
    TailwindDropdownComponent,
    TailwindCheckboxComponent,
    TailwindSelectMultipleComponent,
    TailwindToggleComponent,
  ],
  providers: [TailwindFormsService],
})
export class TailwindFormsModule {}
