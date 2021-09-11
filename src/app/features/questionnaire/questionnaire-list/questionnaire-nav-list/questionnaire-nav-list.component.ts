import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {QCM_API_ENDPOINT_TOKEN, QcmApiEndPoint} from '@app/features/qcm-rest-api/qcm-api-end-point';
import {ExportService} from '@app/features/qcm-rest-api/services/export.service';
import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';
import {Observable} from 'rxjs/internal/Observable';


@Component({
  selector: 'app-questionnaire-nav-list',
  templateUrl: './questionnaire-nav-list.component.html',
  styleUrls: ['./questionnaire-nav-list.component.scss']
})
export class QuestionnaireNavListComponent implements OnInit {

  @Input()
  public elements$: Observable<Questionnaire[]>;

  constructor(private questionnaireListStore: QuestionnaireListStore,
              private tagStore: QuestionnaireListStore, @Inject(QCM_API_ENDPOINT_TOKEN) private endPoint: QcmApiEndPoint,
              private exportService: ExportService, private router: Router) {
  }

  ngOnInit() {
  }

  public isSelected(questionnaire: Questionnaire):
    boolean {
    return this.questionnaireListStore.isSelected(questionnaire);
  }

  public swapTag(tag: Questionnaire) {
    console.log(tag);
    this.tagStore.swapElement(tag);
  }

  public setClickedRow = function (event, questionnaire: Questionnaire) {
    this.questionnaireListStore.swapElement(questionnaire);
    event.stopPropagation();
  };

  download(questionnaire: Questionnaire, type: string) {

    this.exportService.getExportById(questionnaire.uuid, type)
      .subscribe(data => {
        if (type === 'json') {
          type = 'txt';
        }
        this.downLoadFile(data, questionnaire.title + '-' + questionnaire.status + '-' + questionnaire.version + '.' + type);
      });
  }

  navigate(questionnaire: Questionnaire) {

    this.router.navigate(['/questionnaires/' + questionnaire.uuid]);
    // [routerLink] = "['/questionnaires/'+ questionnaire.uuid ]
  }

  /*
  'application/json' , 'application/msword' , 'application/octet-stream'
   */
  private downLoadFile(data: any, fileName: string) {
    const blob = new Blob([data], {type: 'application/octet-stream'});
    // const url = window.URL.createObjectURL(blob);
    // const pwa = window.open(url, '_blank');
    // if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
    //   alert('Please disable your Pop-up blocker and try again.');
    // }
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.click();
  }

}
