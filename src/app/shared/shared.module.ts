import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { StarRatingPipe } from './pipes/star-rating.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent,  StarRatingPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, StarRatingPipe],
})
export class SharedModule {}
