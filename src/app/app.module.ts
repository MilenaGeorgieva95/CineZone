import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { MoviesModule } from './features/movies/movies.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesRoutingModule } from './features/movies/movies-routing.module';
import { WatchlistsModule } from './features/watchlists/watchlists.module';
import { UserModule } from './features/user/user.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MoviesRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    UserModule,
    MoviesModule,
    WatchlistsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
