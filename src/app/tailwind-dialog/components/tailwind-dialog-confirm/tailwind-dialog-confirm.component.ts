import { Component, OnInit } from '@angular/core';
import { TailwindDialogConfig } from '../../tailwind-dialog.config';
import { TailwindDialogRef } from '../../tailwind-dialog.ref';

interface IConfirmDialogConfig {
  title: string;
  description: string;
  actionButton: {
    label: string;
  };
  cancelButton: {
    label: string;
  };
}

class ConfirmDialogConfig {
  title: string;
  description: string;
  actionButton: {
    label: string;
  };
  cancelButton: {
    label: string;
  };

  constructor(data: IConfirmDialogConfig) {
    this.title = data?.title || 'Default title';
    this.description = data?.description || 'Default description';
    this.actionButton = {
      label: data?.actionButton?.label || 'Default action label',
    };
    this.cancelButton = {
      label: data?.cancelButton?.label || 'Default cancel label',
    };
  }
}

@Component({
  selector: 'golden-tailwind-dialog-confirm',
  templateUrl: './tailwind-dialog-confirm.component.html',
})
export class TailwindDialogConfirmComponent implements OnInit {
  public confirmDialogConfig!: IConfirmDialogConfig;

  constructor(
    private config: TailwindDialogConfig,
    private dialog: TailwindDialogRef
  ) {}

  ngOnInit(): void {
    this.confirmDialogConfig = new ConfirmDialogConfig(this.config.data);
  }

  onAction() {
    this.dialog.close('action');
  }

  onCancel() {
    this.dialog.close('cancel');
  }
}
