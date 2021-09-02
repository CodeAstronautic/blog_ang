import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear = new Date();

  subscribeForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscribeForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  subscribeSubmit(){
    if(this.subscribeForm.valid) {

    }
  }


}
