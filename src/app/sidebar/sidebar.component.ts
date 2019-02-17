import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../common/services/feeds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  feeds: any;
  feedForm: FormGroup;
  contactData: any;
  submitted = false;

  constructor(
    private feedsService: FeedsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const formControls = {
      name: ['', Validators.required],
      url: ['', Validators.required]
    };
    this.feedForm = this.formBuilder.group(formControls);
  }

  get f() {
    return this.feedForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.feedForm.invalid) {
      return;
    }

    this.contactData = {
      name: this.f.name.value,
      url: this.f.url.value,
    };
    
  }
  addFeed() {}
}
