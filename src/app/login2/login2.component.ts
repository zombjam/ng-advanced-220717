import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface LoginArg {
  email: string;
  password: string;
  isRememberMe: boolean;
  profiles: Array<ProfileItem>;
}

interface ProfileItem {
  city: string;
  tel: string;
}

type LoginForm = FormGroup<ToForm<LoginArg>>;
type ProfileGroupForm = FormGroup<ToForm<ProfileItem>>;

function forbiddenPassword(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  let words = ['test', '123'];
  if (words.some((word) => control.value.indexOf(word) > -1)) {
    return { forbiddenPassword: true };
  }
  return null;
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
    profiles: [
      { city: 'Taipei', tel: '0988-888888' },
      { city: 'Taichung', tel: '0944-444444' },
      { city: 'Kaohsiung', tel: '0911-111111' },
    ],
  };

  // form!: UntypedFormGroup;
  form: LoginForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        forbiddenPassword,
      ],
    }),
    isRememberMe: this.fb.control(true, {}),
    profiles: this.fb.array<ProfileGroupForm>([]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      let len = this.data.profiles.length;

      if (len) {
        this.form.controls.profiles.clear();

        for (const item of this.data.profiles) {
          this.form.controls.profiles.push(
            this.makeProfile(item.city, item.tel)
          );
        }
      }

      this.form.setValue(this.data);
      // this.form.patchValue(this.data);
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

  doLogin() {
    if (this.form.valid) {
      console.log(this.form.value);
      localStorage.setItem('apikey', 'TEST');
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }

  private makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, { validators: [Validators.required] }),
      tel: this.fb.control(tel, { validators: [Validators.required] }),
    });
  }
}
