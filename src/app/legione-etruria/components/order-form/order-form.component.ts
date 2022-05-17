import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addMonths } from 'date-fns';
import { GroupOrder } from '../../../models/group-order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  @Input() hideElements: (
    | 'shops'
    | 'submit'
    | 'orderNotes'
    | 'startDate'
    | 'dueDate'
  )[] = [];
  @Input() loading = false;
  @Output() submitted = new EventEmitter<Partial<GroupOrder>>();

  public form: FormGroup;

  public shopsDropdown = [
    {
      label: 'Il Semaforo',
      value: 'ilsemaforo',
    },
    {
      label: 'Taiwangun',
      value: 'taiwangun',
    },
  ];

  constructor() {
    this.form = new FormGroup({
      shops: new FormControl([], [Validators.required]),
      startDate: new FormControl(new Date().toISOString(), [
        Validators.required,
      ]),
      dueDate: new FormControl(addMonths(new Date(), 1).toISOString(), [
        Validators.required,
      ]),
      orderNotes: new FormControl('', []),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit(this.form.value);
  }
}
