import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css']
})
export class EarningsComponent implements OnInit {

  apiUrl = environment.apiUrl;

  myWallet: any;
  myWithdrawls: any;

  bankDetailsAvailable = false;
  upiDetailsAvailable = false;

  isBankVerified = false;
  isUpiVerified = false;

  bankEdit = false;
  upiEdit = false;

  withdrawMinError = false;

  bankForm: FormGroup;
  upiForm: FormGroup;;
  withdrawForm: FormGroup;

  showWithDrawForm = false;

  banksList = [
    "Allahabad Bank",
    "Andhra Bank",
    "Axis Bank",
    "Bank of Bahrain and Kuwait",
    "Bank of Baroda - Corporate Banking",
    "Bank of Baroda - Retail Banking",
    "Bank of India",
    "Bank of Maharashtra",
    "Canara Bank",
    "Central Bank of India",
    "City Union Bank",
    "Corporation Bank",
    "Deutsche Bank",
    "Development Credit Bank",
    "Dhanlaxmi Bank",
    "Federal Bank",
    "ICICI Bank",
    "IDBI Bank",
    "Indian Bank",
    "Indian Overseas Bank",
    "IndusInd Bank",
    "ING Vysya Bank",
    "Jammu and Kashmir Bank",
    "Karnataka Bank Ltd",
    "Karur Vysya Bank",
    "Kotak Bank",
    "Laxmi Vilas Bank",
    "Oriental Bank of Commerce",
    "Punjab National Bank - Corporate Banking",
    "Punjab National Bank - Retail Banking",
    "Punjab & Sind Bank",
    "Shamrao Vitthal Co-operative Bank",
    "South Indian Bank",
    "State Bank of Bikaner & Jaipur",
    "State Bank of Hyderabad",
    "State Bank of India",
    "State Bank of Mysore",
    "State Bank of Patiala",
    "State Bank of Travancore",
    "Syndicate Bank",
    "Tamilnad Mercantile Bank Ltd.",
    "UCO Bank",
    "Union Bank of India",
    "United Bank of India",
    "Vijaya Bank",
    "Yes Bank Ltd",
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getWithdrawls();
    this.getWallet();
    this.createWithDrawForm();
  }

  createForms(bank?, upi?) {
    console.log('bank')
    console.log(bank)
    this.bankForm = this.fb.group({
      account_holder_name: [bank ? bank.account_holder_name : '', [Validators.required]],
      name: [bank ? bank.name : '', [Validators.required]],
      account_branch: [bank ? bank.account_branch : '', [Validators.required]],
      account_number: [bank ? bank.account_number : '', [Validators.required, Validators.minLength(9), Validators.maxLength(18)]],
      account_number_confirm: [bank ? bank.account_number : '', [Validators.required, Validators.minLength(9), Validators.maxLength(18)]],
      account_ifsc: [bank ? bank.account_ifsc : '', [Validators.required, Validators.minLength(11)]]
    }, {
      validator: this.MustMatch('account_number', 'account_number_confirm')
    });
    this.upiForm = this.fb.group({
      upi: [upi ? upi : '', [Validators.required]]
    });
  }
  createWithDrawForm() {
    this.withdrawForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(5000)]],
      method: ['', [Validators.required]]
    });
    this.withdrawForm.controls.method.valueChanges.subscribe((value) => {
      console.log(value);
      if(value < 5000) {
        this.withdrawMinError = true;
      } else {
        this.withdrawMinError = true;
      }
    });
    this.withdrawForm.controls.method.valueChanges.subscribe((value) => {
      console.log(value);
      if(value == 'bank' && !this.bankDetailsAvailable) {
        window.alert('please add bank details to your account first');
        this.withdrawForm.controls.method.patchValue('');
        this.withdrawForm.controls.method.markAsDirty();
      }
      if(value == 'upi' && !this.upiDetailsAvailable) {
        window.alert('please add UPI ID to your account first');
        this.withdrawForm.controls.method.patchValue('');
        this.withdrawForm.controls.method.markAsDirty();
      }
    });
  }

  getWallet = () => {
    this.http.get(`${this.apiUrl}api/wallet`).subscribe((reponse: any) => {
      console.log(reponse);
      if (reponse.success) {
        this.myWallet = reponse.wallet;
        this.isBankVerified = reponse.wallet.is_bank_verified;
        this.isUpiVerified = reponse.wallet.is_upi_verified;
        if (reponse.wallet.bank && reponse.wallet.bank.length > 0) {
          this.bankDetailsAvailable = true
        }
        if (reponse.wallet.upi) {
          this.upiDetailsAvailable = true
        }
        this.createForms(reponse.wallet.bank[0], reponse.wallet.upi);
        console.log(this.myWallet);
      }
    })
  }
  getWithdrawls = () => {
    this.http.get(`${this.apiUrl}api/withdrawl`).subscribe((reponse: any) => {
      console.log(reponse);
      // if (reponse.success) {
        this.myWithdrawls = reponse;
      // }
    })
  }

  showBankForm() {
    this.bankEdit = true;
  }
  closeBankForm() {
    this.bankEdit = false;
  }
  showUPIForm() {
    this.upiEdit = true;
  }
  closeUPIForm() {
    this.upiEdit = false;
  }
  showWithdrawForm() {
    const minAmount = this.myWallet && this.myWallet.amount ? this.myWallet.amount : 0;
    if(minAmount > 5000) {
      this.showWithDrawForm = true;
    } else {
      window.alert('unable to do withdrawl request right now, you dont have enough earning to withdraw. Min amount to withdraw = 5000');
    }
  }
  closeWithdrawForm() {
    this.showWithDrawForm = false;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  onSubmitBank() {
    console.log(this.bankForm.value);
    this.http.post(`${this.apiUrl}api/wallet`, { bank: this.bankForm.value }).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        location.reload();
      }
    });
  }
  onSubmitUpi() {
    console.log(this.upiForm.value);
    this.http.post(`${this.apiUrl}api/wallet`, this.upiForm.value).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        location.reload();
      }
    });
  }
  onSubmitWithdraw() {
    console.log(this.withdrawForm.value);
    this.http.post(`${this.apiUrl}api/withdrawl`, this.withdrawForm.value).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        // location.reload();
      }
    });
  }

}
