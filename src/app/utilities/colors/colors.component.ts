import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  type: string | null = '';
  name: string | null = '';
  data: any = {};

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.type = this.route.snapshot.paramMap.get('type');
    this.route.paramMap.subscribe((param) => {
      this.type = param.get('type');
    });

    this.route.queryParamMap.subscribe((query) => {
      this.name = query.get('name');
    });

    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  navigateTo(val: number) {
    let result = +(this.type || 0) + val;
    if (!result) return;
    this.router.navigate(['../', result], {
      queryParamsHandling: 'preserve',
      relativeTo: this.route,
    });
  }
}
