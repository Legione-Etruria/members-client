import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  documents = [
    {
      label: 'Statuto Legione Etruria',
      description:
        'Racchiude le informazioni legali relative al funzionamento legale della ASD ed ai diritti e doveri dei relativi soci.',
      href: 'https://drive.google.com/file/d/1tWhMFJ4CsCHi0sFW832XOUuJZjiGFT8R/view',
    },
    {
      label: 'Regolamento Legione Etruria',
      description:
        'Comprende tutte quelle regole ed azioni che ogni membro deve rispettare durante le sessioni di allenamento o ai vari eventi.',
      href: 'https://drive.google.com/file/d/1PD85mSCFFUYx0kZrOR1pVZ29VmSr-Fqj/view',
    },
    {
      label: 'Liberatoria minori',
      description:
        'Liberatoria consistente in uno scarico di responsabilità da far firmare ai minori non accompagnati da un tutore legale.',
      href: 'https://drive.google.com/file/d/127vbQQVSKsztpbO-mbjW2UB5FBOiSt_e/view',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
