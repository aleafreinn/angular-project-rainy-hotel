import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'happ-exterior',
  templateUrl: './exterior.component.html',
  styleUrls: ['./exterior.component.scss'],
  // providers: [RoomsService],
})
export class ExteriorComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.minLength(12)]),
  });
  submittedData: any[] = [];

  constructor() {}
  ngOnInit() {
    // this.myForm = new FormGroup({
    //   name: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]]
    // });
  }

  get formControls() {
    return this.myForm.controls;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.controls['name'].value);
      console.log(this.myForm.get('name')?.value);
      // to access only the first name from the form group:

      console.log('Form values:', this.myForm.value);
      // Handle form submission

      this.submittedData.push(this.myForm.value);
      this.myForm.reset(); // Reset the form fields
    }
  }
}
