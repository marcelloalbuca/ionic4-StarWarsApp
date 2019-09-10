import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from './../../services/favorite.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss']
})
export class FilmDetailsPage implements OnInit {
  //filmId = null;
  film: any;
  isFavorite = false;
  filmId = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
    private emailComposer: EmailComposer,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.filmId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getFilm(this.filmId).subscribe(res => {
      this.film = res;
    });

    this.favoriteService.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    });
  }

  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    });
  }

  shareFilm() {
    let email = {
      to: 'marcello.albuca@gmail.com',
      subject: 'I love this one: ' + this.film.title,
      body: 'Can you remember the opening?<br><br>"' + this.film.opening_crawl + '"',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
