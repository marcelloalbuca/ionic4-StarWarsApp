import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss']
})
export class FilmsPage implements OnInit {
  films: Observable<any>;

  constructor(
    private navController: NavController,
    private router: Router,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.films = this.api.getFilms();
  }

  openDetails(film) {
    // Both of these would work!
    // But the standard Router is recommended.
    // this.navController.navigateForward(`/tabs/films/42`);
    //this.router.navigateByUrl(`/tabs/films/42`);
    let split = film.url.split('/');
    let filmId = split[split.length - 2];
    this.router.navigateByUrl(`/tabs/films/${filmId}`);
  }

  goToPlanets() {
    this.navController.navigateRoot(`/tabs/planets`);
  }
}
