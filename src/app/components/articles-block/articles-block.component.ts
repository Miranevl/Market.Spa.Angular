import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { TrackingArticlesService } from 'src/app/services/tracker/TrackingArticles/tracking-articles.service';

@Component({
  selector: 'app-articles-block',
  templateUrl: './articles-block.component.html',
})
export class ArticlesBlockComponent {
  id: number | undefined;
  editorOptions = { theme: 'vs' };
  code: string = '';
  data: any = {}

  constructor(private trackingArticlesService: TrackingArticlesService, private route: ActivatedRoute, public generalService: GeneralService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.id = parseInt(idString, 10);
      } else {
        console.log(idString);
      }
    });
    if (this.id !== undefined) {
      this.refreshTrackingArticles();
    }
  };

  refreshTrackingArticles() {
    if (this.id) {
      this.trackingArticlesService.getTrackingArticles(this.id).subscribe(
        response => {
          this.data = response;
          this.code = this.data.data.map((item: any) => item.text).join('\n');
        },
        error => {
          console.log(error);
        }
      )
    }
  };

  diffTrackerArticles() {
    if (this.id) {
      this.trackingArticlesService.getTrackingArticles(this.id).subscribe(
        () => {
          const originalArticles = new Set(this.data.data.map((num: any) => num));
          const changedKeys = new Set(this.code.split('\n').map((num) => num.trim()));
          const addedArticles = [...changedKeys].filter((num) => !originalArticles.has(num));
          const removedArticles = this.data.data
            .filter((num: any) => !changedKeys.has(num.text))
            .map((num: any) => num.id);
          this.handleChanges(addedArticles, removedArticles);
        },
        error => {
          console.log('ошибка')
        }
      )
    }
  };

  handleChanges(addedArticles: string[], removedArticles: number[]) {
    if (this.id) {
      if (removedArticles.length > 0) {
        this.trackingArticlesService.removeTrackingArticles(this.id, removedArticles).subscribe(
          () => {
            alert('артикулы были обновлены');
            this.refreshTrackingArticles();
          },
          error => {
            console.log(error);
          }
        );
      }

      if (addedArticles.length > 0) {
        const cleanedArticles = addedArticles
          .map((article) => this.cleanUpArticles(article))
          .filter((article) => article.trim() !== '');
        this.trackingArticlesService.addTrackingArticles(this.id, cleanedArticles).subscribe(
          (response) => {
            alert('новые артикулы добавлены');
            this.refreshTrackingArticles();
          },
          error => {
            console.log(error, 'тут ошибкуа');
          }
        );
      }
    }
  }

  cleanUpArticles(articles: string): string {
    const regex = /\d{1,9}/g;
    const cleanedNum = articles.replace(regex, (match) => {
      const digitsOnly = match.replace(/\D/g, '');
      if (digitsOnly.length > 0) {
        return `"\n# ${digitsOnly}:\n\t"`;
      }
      return match;
    });
    return cleanedNum;
  };



  deleteAllTrackingArticles() {
    this.generalService.setCallback(() => {
      if (this.id) {
        this.trackingArticlesService.clearTrackingArticles(this.id).subscribe(
          () => {
            alert('Все аритукла удалены');
            this.refreshTrackingArticles();
            this.generalService.showDialog = false;
          },
          error => {
            console.log(error);
          }
        )
      }
    });
    this.generalService.showDialog = true;
  };

}
