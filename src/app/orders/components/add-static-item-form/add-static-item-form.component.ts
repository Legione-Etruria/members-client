import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-static-item-form',
  templateUrl: './add-static-item-form.component.html',
  styleUrls: ['./add-static-item-form.component.scss'],
})
export class AddStaticItemFormComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  @Input() itemData: {
    itemUrl: string;
    itemPrice: number;
    itemName: string;
    imgSrc: string;
  } = { itemUrl: '', itemPrice: 0, itemName: '', imgSrc: '' };
  @Input() loading = false;

  public form!: FormGroup;

  public itemTypes = [
    {
      name: 'Pallini',
      value: 'bb',
    },
    {
      name: 'Equipaggiamento',
      value: 'equip',
    },
  ];

  ngOnInit() {
    this.form = new FormGroup({
      itemUrl: new FormControl(this.itemData.itemUrl, Validators.required),
      itemPrice: new FormControl(
        String(this.itemData.itemPrice),
        Validators.required
      ),
      itemName: new FormControl(this.itemData.itemName, Validators.required),
      imgSrc: new FormControl(this.itemData.imgSrc, Validators.required),
      itemMeasueUnit: new FormControl('Pz.', Validators.required),
      itemType: new FormControl('bb', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.form.controls['itemPrice'].setValue(Number(this.form.value.itemPrice));

    this.formSubmitted.emit(this.form.value);

    this.form.controls['itemPrice'].setValue(String(this.form.value.itemPrice));
  }
}
