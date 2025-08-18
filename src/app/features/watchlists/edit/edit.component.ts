import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  invalidForm:boolean=false;
  errorMsg:string=''
  editWatchlist(form: NgForm) {}
  cancelHandler(form: NgForm) {
    form.setValue({ title: '', description: '' });
  }
}
