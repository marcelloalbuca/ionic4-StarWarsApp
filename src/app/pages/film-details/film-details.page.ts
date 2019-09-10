import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss']
})
export class FilmDetailsPage implements OnInit {
  filmId = null;
  film: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
    private emailComposer: EmailComposer
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getFilm(id).subscribe(res => {
      this.film = res;
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
