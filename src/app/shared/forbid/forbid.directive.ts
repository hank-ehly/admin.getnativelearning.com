import { AbstractControl, ValidatorFn, NG_VALIDATORS, Validators, Validator, ValidationErrors } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[gnForbid]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbidDirective, multi: true}]
})
export class ForbidDirective implements Validator, OnChanges {
    @Input('gnForbid') value: string;

    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['value'];
        this.valFn = change ? matchValidator(change.currentValue) : Validators.nullValidator;
    }

    validate(c: AbstractControl): ValidationErrors | any {
        return this.valFn(c);
    }
}

function matchValidator(forbiddenValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name = control.value;
        console.log(control.value, forbiddenValue);
        return name === forbiddenValue ? {'match': {name}} : null;
    };
}
