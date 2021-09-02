import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footerglobal',
  templateUrl: './footerglobal.component.html',
  styleUrls: ['./footerglobal.component.css']
})
export class FooterglobalComponent implements OnInit {

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
