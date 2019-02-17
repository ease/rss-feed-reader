import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../common/services/feeds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeFeeds: any;
  feedForm: FormGroup;
  formData: any;
  submitted = false;

  constructor(
    private feedsService: FeedsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const formControls = {
      name: ['', Validators.required],
      url: ['https://www.adweek.com/feed/', Validators.required]
    };
    this.feedForm = this.formBuilder.group(formControls);
  }

  get f() {
    return this.feedForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.feedForm.invalid) {
      return;
    }

    this.formData = {
      name: this.f.name.value,
      url: this.f.url.value
    };
    this.feedsService.getFeeds(this.formData.url).subscribe(feeds => {
      console.log('Sidebar feeds:', feeds);
      if ((feeds.status = 200)) {
        this.activeFeeds = new Array(...this.formData.name, 2, 3);
        console.log('activeFeeds::', this.activeFeeds)
      }
    });
  }
}
