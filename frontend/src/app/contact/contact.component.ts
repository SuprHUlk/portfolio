import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private contactService: ContactService) {}

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.contactForm);
    console.log(this.contactForm.valid);
    let value: any = this.contactForm.value;
    value.access_key = '66dda096-a713-4d91-a640-27b59453c8ea';
    console.log(value);
    if (this.contactForm.valid) {
      this.contactService.send(value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }
}
