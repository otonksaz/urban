import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  providers: [UserService, ToastrService]
})
export class ChangepasswordComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService
  ) {
    this.form = formBuilder.group({
        oldPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required]
    },{validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});
   }

  ngOnInit() {
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  save() {
    if (this.form.controls['newPassword'].value != this.form.controls['confirmPassword'].value) {
      return;
    }

    let userId = localStorage.getItem('urban_userid');
    if (userId) {
      this.userService.changePassword(userId, this.form.value).subscribe(
        success => {
          this.toastService.success("Password berhasil diubah", "SUCCESS");
        },
        error => {
          console.log(error);
          let j_message = error.error;
          this.toastService.error(j_message.error_message, "ERROR");
        }
      )
    }else {
      console.log("tidak ada");
    }
  }

}
