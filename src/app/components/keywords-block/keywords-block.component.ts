import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingKeywordsService } from 'src/app/services/tracker/TrackingKeywords/tracking-keywords.service';

@Component({
  selector: 'app-keywords-block',
  templateUrl: './keywords-block.component.html',
})
export class KeywordsBlockComponent {
  id: number | undefined;
  editorOptions = { theme: 'vs' };
  code: string = '';
  data: any = {}
  keyword: string = '';
  dataKeywords: any = {};

  constructor(private TrackingKeywordsService: TrackingKeywordsService, private route: ActivatedRoute) { }
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
      this.refreshTrackingKeywords();
    }
  }

  refreshTrackingKeywords() {
    if (this.id) {
      this.TrackingKeywordsService.getTrackingKeywords(this.id).subscribe(
        response => {
          this.data = response;
          this.code = this.data.data.map((item: any) => item.text).join('\n');
          console.log(this.code);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  deleteAllTrackers() {
    if (this.id) {
      this.TrackingKeywordsService.clearAllTrackingKeywords(this.id).subscribe(
        response => {
          alert('Все ключевые слова были удалены!');
          this.refreshTrackingKeywords()
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  diffTrackerKeywords() {
    if (this.id) {
      this.TrackingKeywordsService.getTrackingKeywords(this.id).subscribe(
        () => {
          const originalKeywords = new Set(this.data.data.map((item: any) => item.text));
          const changedKeys = new Set(this.code.split('\n').map((keyword) => keyword.trim().toLowerCase()));
          const addedKeywords = [...changedKeys].filter((keyword) => !originalKeywords.has(keyword));
          const removedKeywords = this.data.data
            .filter((keyword: any) => !changedKeys.has(keyword.text.toLowerCase()))
            .map((keyword: any) => keyword.id);
          this.handleChanges(addedKeywords, removedKeywords);
        },
        error => {
          console.log('ошибка')
        }
      )
    }
  }

  handleChanges(addedKeywords: string[], removedKeywords: number[]) {
    if (this.id) {
      if (removedKeywords.length > 0) {
        this.TrackingKeywordsService.removedTrackingKeywords(this.id, removedKeywords).subscribe(
          () => {
            alert('слова были обновлены');
            this.refreshTrackingKeywords();
          },
          error => {
            console.log(error);
          }
        );
      }

      if (addedKeywords.length > 0) {
        const cleanedKeywords = addedKeywords
          .map((keyword) => this.cleanUpText(keyword))
          .filter((keyword) => keyword.trim() !== '');
        this.TrackingKeywordsService.addTrackingKeywords(this.id, cleanedKeywords).subscribe(
          () => {
            alert('новые слова добавлены');
            this.refreshTrackingKeywords();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  suggestKeyword(keyword: string) {
    this.TrackingKeywordsService.suggestKeywords(keyword).subscribe(
      response => {
        this.dataKeywords = response;
        console.log(this.dataKeywords);
      },
      error => {
        console.log(error);
      }
    )
  }

  cleanUpText(keyword: string): string {
    const regex = /["'\t\r\n,;]| {2,}/g;
    return keyword.replace(regex, '');
  }

}
