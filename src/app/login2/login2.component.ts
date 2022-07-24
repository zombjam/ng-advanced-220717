import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

interface LoginArg {
  email: string;
  password: string;
  isRememberMe: boolean;
  profiles: Array<{ city: string; tel: string }>;
}

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit, OnDestroy {
  orig_body_className = document.body.className;

  data = {
    email: 'test@example.com',
    password: '123456',
    isRememberMe: true,
    // city: 'Taipei',
    profiles: [],
  };

  // form!: UntypedFormGroup;
  form: FormGroup<ToForm<LoginArg>> = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ],
    }),
    isRememberMe: this.fb.control(true, {}),
    profiles: this.fb.array([
      this.makeProfile('Taipei', '0988-888888'),
      this.makeProfile('Taichung', '0944-444444'),
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      // this.form.setValue(this.data);
      this.form.patchValue(this.data);
    }, 2000);
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  resetForm() {
    this.form.reset(this.data);
  }

  addProfile() {
    this.form.controls.profiles.push(this.makeProfile('', ''));
  }

  private makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, { validators: [Validators.required] }),
      tel: this.fb.control(tel, { validators: [Validators.required] }),
    });
  }
}
