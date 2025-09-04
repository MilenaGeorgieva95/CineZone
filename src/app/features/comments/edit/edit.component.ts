import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { CommentsService } from '../services/comments.service';
import { FullComment } from 'src/app/types/comment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService,
    private location: Location
  ) {}
  commentId: string = '';
  comment = {} as FullComment;
  loading: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.commentId = params.get('commentId') || '';
      if (!this.commentId) {
        return;
      }
      this.loading=true;
      this.commentsService.getById(this.commentId).subscribe({
        next: (data) => {(this.comment = data)
          this.loading=false
        },
        error:(err)=>{
          this.loading=false
          console.log(err)},
      });
    });
    
  }

  editCommentHandler(editCommentForm: NgForm) {
    if (editCommentForm.invalid) {
      return;
    }
    const comment = editCommentForm.form.controls['comment'].value;
    this.loading=true;
    this.commentsService
      .editById(this.commentId, comment)
      .subscribe((data) => {
      console.log(data);
      this.loading=false
      this.location.back()
      });
  }

   goBack() {
    this.location.back();
  }
}
