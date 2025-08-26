import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { StarRatingPipe } from './pipes/star-rating.pipe';
import { EmailDirective } from './validators/email.directive';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, StarRatingPipe, EmailDirective,MovieCardComponent, LoaderComponent, PageNotFoundComponent, ElapsedTimePipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, StarRatingPipe, EmailDirective, MovieCardComponent, LoaderComponent, PageNotFoundComponent, ElapsedTimePipe],
})
export class SharedModule {}
