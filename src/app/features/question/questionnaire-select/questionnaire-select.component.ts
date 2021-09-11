import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChip} from '@angular/material';
import {Criteria} from '@app/features/qcm-rest-api/model/criteria';
import {Questionnaire} from '@app/features/qcm-rest-api/model/questionnaire.model';
import {Letter} from '@app/features/tag/tag-select/Letter';
import {QuestionnaireListStore} from '@app/features/stores/questionnaire-list-store.service';


@Component({
  selector: 'app-questionnaire-select',
  templateUrl: './questionnaire-select.component.html',
  styleUrls: ['./questionnaire-select.component.scss']
})
export class QuestionnaireSelectComponent implements OnInit {

  public selected: Questionnaire[];
  public questionnaires: Questionnaire[];
  public letters: Array<Letter> = [];

  public selectedChips: MatChip[];

  public removable = true;
  public selectable = true;
  public letter;

  @Input()
  public showSelected = true;

  @Output('onSelected')
  private onSelected = new EventEmitter<Questionnaire[]>();


  constructor(private questionnaireListStore: QuestionnaireListStore) {

    this.questionnaireListStore.selected$.subscribe((selected) => {
      this.selected = selected;
      this.onSelected.emit(selected);
    });

    this.questionnaireListStore.page$.subscribe((page) => {
      this.questionnaires = page.content;
      if (this.letters.length === 0) {
        this.buildLetters();
      }
    });

    this.questionnaireListStore.getPage(0, 100, 'title');
  }

  ngOnInit() {
  }

  private buildLetters() {
    const letters: Array<string> = [];
    this.letters = [];
    for (let j = 0; this.questionnaires.length > j; j++) {
      letters.push(this.questionnaires[j].title.substring(0, 1).toUpperCase());
    }

    for (const l of Array.from(new Set(letters))) {
      this.letters.push(new Letter(l));
    }
  }

  public isSelectItem(tag: Questionnaire): boolean {
    return this.questionnaireListStore.isSelected(tag);
  }

  public unSelectItem(tag: Questionnaire) {
    this.questionnaireListStore.selectElement(tag, false);
  }

  public selectItem(tag: Questionnaire) {
    this.questionnaireListStore.selectElement(tag, true);
  }

  public selectLetter(letter) {
    const criteria: Criteria[] = [new Criteria(letter, 'firstLetter')];

    this.questionnaireListStore.getPageByCriteria(criteria, 0, 100, 'title');
  }

}
