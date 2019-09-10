import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss']
})
export class FilmDetailsPage implements OnInit {
  filmId = null;
  film: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(`https://swapi.co/api/films/${id}`).subscribe(res => {
      this.film = res;
    });
  }
}
