import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { chartAreaDemo } from '../chartAreaDemo';
import { chartPieDemo } from '../chartPieDemo';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    chartAreaDemo();
    chartPieDemo();
  }

  gotoColors(type: number, name: string) {
    this.router.navigateByUrl('/utilities/colors/' + type + '?name=' + name);
  }

  gotoColors2(type: number, name: string) {
    this.router.navigate(['/utilities/colors', type], {
      queryParamsHandling: 'merge',
      queryParams: {
        name,
      },
    });
  }
}
