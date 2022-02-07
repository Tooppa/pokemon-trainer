import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/storage/local-storage.service';
import { TrainerFacade } from '../services/trainer/trainer.facade';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public nameForm: FormGroup;
  trainerName: string = '';

  constructor(private formBuilder: FormBuilder, private readonly trainerFacade: TrainerFacade, private readonly router: Router, private readonly localStorage: LocalStorageService) {
    this.nameForm = this.formBuilder.group({
      trainerName: '',
    });
  }

  submit() {
    this.trainerName = this.nameForm.get('trainerName')?.value;
    if (this.trainerName != '')
      this.trainerFacade.postTrainer(this.trainerName, () => {
        this.router.navigate(['/trainer']);
      });
  }


  ngOnInit(): void {
    // Check if logged in
    if (this.localStorage.hasStored) {
      this.router.navigate(['/trainer']);
    }
  }
}
