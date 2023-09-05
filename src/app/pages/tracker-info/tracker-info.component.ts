import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracker-info',
  templateUrl: './tracker-info.component.html',
})
export class TrackerInfoComponent implements OnInit {
  title: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title');
    });
  }

}
