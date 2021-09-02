import { Directive, OnInit, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import firebase from 'firebase';

@Directive({
    selector: 'app-recaptcha',
    exportAs: 'recaptcha'
})
export class RecaptchaDirective implements OnInit, OnDestroy {
    constructor(private el: ElementRef<HTMLElement>) {

    }
    recaptchaInstanse: firebase.auth.RecaptchaVerifier;
    @Output()
    verifed = new EventEmitter<string>();
    ngOnInit() {
        if (!this.el.nativeElement.id) {
            // this line just generates a unique Id for our element
            this.el.nativeElement.id = '64a5sd64s5d4f6s5f465sd165s';
        }
        this.recaptchaInstanse = new firebase.auth.RecaptchaVerifier(this.el.nativeElement.id);
        this.recaptchaInstanse.render();
    }
    verify() {
        this.recaptchaInstanse.verify().then(a => this.verifed.emit());
    }
    ngOnDestroy() {
        this.verifed.complete();
        this.recaptchaInstanse.clear();
        this.recaptchaInstanse = undefined;
    }

}
