import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { StarRatingPipe } from './pipes/star-rating.pipe';
import { EmailDirective } from './validators/email.directive';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, StarRatingPipe, EmailDirective,MovieCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, StarRatingPipe, EmailDirective, MovieCardComponent],
})
export class SharedModule {}
