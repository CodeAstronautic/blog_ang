import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateContactForm();
  }

  generateContactForm() {
    this.contactForm = this._fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      mobile: [null, Validators.required, Validators.minLength(10), Validators.maxLength(13)],
      message: [null, Validators.required, Validators.maxLength(1500)]
    })
  }
  contactFormSubmit() {
    if (this.contactForm.valid) {
      // submit form here
    }
  }

}
