import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { format, getMonth, getYear, isDate, parseISO } from 'date-fns';
import { TailwindFormsService } from '../../services/tailwind-forms.service';

@Component({
  selector: 'golden-tailwind-datepicker',
  templateUrl: './tailwind-datepicker.component.html',
})
export class TailwindDatepickerComponent implements OnInit, OnChanges {
  @Input() parent!: UntypedFormGroup;
  @Input() label!: string;
  @Input() name!: string;
  @Input() placeholder = '';
  @Input() validationErrors!: { [key: string]: string };
  @Input() disabled = false;
  @Input() toggleTimelineAxis = true; //true = dates in the future, false = dates in the past

  @ViewChild('datepickerElement') datepickerElement!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  public MONTH_NAMES = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  public DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  showDatepicker = false;
  datepickerValue = '';

  disableButtons: { backwards: boolean; forwards: boolean } = {
    backwards: false,
    forwards: false,
  };

  month: number;
  year: number;
  days: string[];
  no_of_days: number[] = [];
  blankdays: number[] = [];

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.datepickerElement.nativeElement.contains(event.target)) {
      this.showDatepicker = false;
    }
  }

  constructor(private tailwindFormService: TailwindFormsService) {
    this.days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
  }

  ngOnInit(): void {
    this.lifeCycle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validationErrors']) {
      this.validationErrors =
        this.tailwindFormService.fillValidationErrorsWithMissing(
          this.parent.get(this.name),
          this.validationErrors
        );
    }

    this.lifeCycle();
  }

  private lifeCycle() {
    this.getNoOfDays();

    const value = this.parent.get(this.name)?.value;
    if (isDate(value) || this.isIsoDate(value)) {
      const dateValue = new Date(value);

      if (dateValue) {
        this.datepickerValue = format(dateValue, 'dd/MM/yyyy');
        this.month = getMonth(dateValue);
        this.year = getYear(dateValue);
      }
    }

    if (!this.label) {
      this.label = this.name;
    }

    this.checkDisableForwards();
    this.checkDisableBackwards();
  }

  get hasErrors() {
    // console.log('hasErrors', !!this.parent.get(this.name)?.errors);
    return this.parent.get(this.name)?.errors;
  }

  get touched() {
    // console.log('touched', !!this.parent.get(this.name)?.touched);
    return this.parent.get(this.name)?.touched;
  }

  get showValidationErrors() {
    return !!this.hasErrors;
  }

  get validationErrorMessage() {
    if (!this.hasErrors) {
      return '';
    }

    return this.validationErrors[Object.keys(this.hasErrors)[0]];
  }

  isToday(day: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, day);

    return today.toDateString() === d.toDateString() ? true : false;
  }

  isSelected(day: number) {
    const selectedDate = parseISO(this.parent.get(this.name)?.value);

    if (!selectedDate) {
      return false;
    }

    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    return (
      this.month === selectedMonth &&
      this.year === selectedYear &&
      day === selectedDay
    );
  }

  public getDateValue(day: number) {
    const selectedDate = new Date(this.year, this.month, day) || new Date();

    this.datepickerValue = format(selectedDate, 'dd/MM/yyyy');
    this.parent.patchValue({ [this.name]: selectedDate });

    this.dateInput.nativeElement.value =
      selectedDate?.getFullYear() +
      '-' +
      ('0' + selectedDate.getMonth()).slice(-2) +
      '-' +
      ('0' + selectedDate.getDate()).slice(-2);

    this.showDatepicker = false;
  }

  public decrementMonthAndGetNoOfDays() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }

    this.checkDisableBackwards();
    this.checkDisableForwards();
    this.getNoOfDays();
  }

  public incrementMonthAndGetNoOfDays() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }

    this.checkDisableForwards();
    this.checkDisableBackwards();
    this.getNoOfDays();
  }

  public getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // console.log('daysInMonth', daysInMonth);

    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay() - 1;
    // console.log('dayOfWeek', dayOfWeek);

    const blankDaysArray = [];

    for (let i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    // console.log('daysArray', daysArray);

    this.blankdays = blankDaysArray;

    this.no_of_days = daysArray;

    return { daysArray, blankDaysArray };
  }

  public updateCalendar() {
    this.getNoOfDays();
    this.checkDisableForwards();
    this.checkDisableBackwards();
  }

  public checkDisableForwards() {
    const today = new Date();
    !this.toggleTimelineAxis &&
    this.month >= getMonth(today) &&
    this.year >= getYear(today)
      ? ((this.disableButtons.forwards = true),
        (this.month = getMonth(today)),
        (this.year = getYear(today)))
      : (this.disableButtons.forwards = false);
  }

  public checkDisableBackwards() {
    const today = new Date();

    this.toggleTimelineAxis &&
    this.month <= getMonth(today) &&
    this.year <= getYear(today)
      ? ((this.disableButtons.backwards = true),
        (this.month = getMonth(today)),
        (this.year = getYear(today)))
      : (this.disableButtons.backwards = false);
  }

  isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const d = new Date(str);
    return (
      d instanceof Date &&
      !isNaN(d as unknown as number) &&
      d.toISOString() === str
    ); // valid date
  }
}
