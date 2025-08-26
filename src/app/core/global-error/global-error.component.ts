import { Component, OnInit } from '@angular/core';
import { GlobalErrorService } from './global-error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css'],
})
export class GlobalErrorComponent implements OnInit {
  errorMsg: any= null;

  constructor(private globalErrorService: GlobalErrorService) {}

  ngOnInit(): void {
    this.globalErrorService.apiError$.subscribe((err) => {
      this.errorMsg = err;
    });
  }
}
