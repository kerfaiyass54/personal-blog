import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RecommendationService
} from '../service/recommendation-service.service';

@Component({
  selector: 'app-recommandations-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl:
    './recommandations-page.component.html',
  styleUrl:
    './recommandations-page.component.scss'
})

export class RecommandationsPageComponent
  implements OnInit {

  email: string | null = null;

  recommendations: any[] = [];

  loading = false;

  constructor(
    private recommendationService:
    RecommendationService
  ) {}

  ngOnInit(): void {

    this.email =
      sessionStorage.getItem('email');

    if (!this.email) {
      return;
    }

    this.loadRecommendations();
  }

  /* ========================= */
  /* LOAD */
  /* ========================= */

  loadRecommendations(): void {

    this.loading = true;

    this.recommendationService
      .getRecommendationsByUserId(
        this.email
      )
      .subscribe({

        next: (res) => {

          this.recommendations = [];

          if (
            !res ||
            res.length === 0
          ) {

            this.loading = false;

            return;
          }

          /*
          Get latest recommendation object
          */

          const latestRecommendation =
            res.sort(

              (
                a: any,
                b: any
              ) =>

                new Date(
                  b.createdAt
                ).getTime()

                -

                new Date(
                  a.createdAt
                ).getTime()

            )[0];

          /*
          Extract songs only from latest object
          */

          if (
            latestRecommendation.recommendations
          ) {

            this.recommendations =

              latestRecommendation
                .recommendations
                .map((song: any) => ({

                  ...song,

                  createdAt:
                  latestRecommendation.createdAt

                }));

          }

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  /* ========================= */
  /* OPEN SOURCE */
  /* ========================= */

  openSource(song: any): void {

    const query = encodeURIComponent(

      `${song.title} ${song.author}`

    );

    let url = '';

    if (
      song.source === 'YOUTUBE'
    ) {

      url =
        `https://www.youtube.com/results?search_query=${query}`;

    }

    else {

      url =
        `https://open.spotify.com/search/${query}`;

    }

    window.open(
      url,
      '_blank'
    );

  }

}
