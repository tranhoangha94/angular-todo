import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  getDataJson,
  isAccountExist,
  updateDataJson,
} from '../../service/utils';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  createNotification(
    type: string,
    notifyTitle?: string,
    notifyContent?: string
  ): void {
    this.notification.create(type, notifyTitle ?? '', notifyContent ?? '');
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { userName, password } = this.validateForm.value;
      if (userName && password) {
        if (isAccountExist({ userName, password })) {
          this.createNotification(
            'error',
            'Register Failed!',
            'Account is exist'
          );
        } else {
          const allAccounts = getDataJson();
          console.log(allAccounts);
          const newAccount = { userName, password };
          const newData = [...allAccounts, newAccount];
          updateDataJson(newData);
          this.createNotification(
            'success',
            'Register Success!',
            'Account is created'
          );
        }
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService
  ) {}
}
