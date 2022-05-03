import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TailwindFormsService } from '../../services/tailwind-forms.service';

@Component({
  selector: 'golden-tailwind-toggle',
  templateUrl: './tailwind-toggle.component.html',
})
export class TailwindToggleComponent implements OnChanges {
  @Input() parent!: FormGroup;
  @Input() label: string = 'Default label';
  @Input() name!: string;
  @Input() helpText!: string;
  @Input() validationErrors!: { [key: string]: string };
  @Input() showValueLabel: boolean = false;
  @Input() valueLabelTrue: string = 'Default value label true';
  @Input() valueLabelFalse: string = 'Default value label false';

  constructor(private tailwindFormService: TailwindFormsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validationErrors']) {
      this.validationErrors =
        this.tailwindFormService.fillValidationErrorsWithMissing(
          this.parent.get(this.name),
          this.validationErrors
        );
    }
  }

  get hasErrors() {
    return this.parent.get(this.name)?.errors;
  }

  get touched() {
    return this.parent.get(this.name)?.touched;
  }

  get showValidationErrors() {
    return this.hasErrors && this.touched;
  }

  get validationErrorMessage() {
    if (!this.hasErrors) {
      return '';
    }

    if (
      !this.validationErrors ||
      !this.validationErrors[Object.keys(this.hasErrors)[0]]
    ) {
      return 'Errore di validazione';
    }

    return this.validationErrors[Object.keys(this.hasErrors)[0]];
  }
}
