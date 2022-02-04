import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public nameForm: FormGroup;
  trainerName: string = "";

  submit() {
    this.trainerName=this.nameForm.get('trainerName')?.value;
    console.log(this.trainerName);
  }

  constructor(private formBuilder: FormBuilder) {
    this.nameForm = this.formBuilder.group({
      trainerName: ''
    });
  }

  ngOnInit(): void {
  }

}
