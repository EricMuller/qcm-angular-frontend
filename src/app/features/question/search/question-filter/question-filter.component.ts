import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TagStore} from '../../../tag/stores/tag-store.service';
import {TdPulseAnimation} from '@covalent/core';

@Component({
  selector: 'app-questionnaire-filter',
  templateUrl: './question-filter.component.html',
  styleUrls: ['./question-filter.component.scss'],
  animations: [
    TdPulseAnimation(),
  ]
})
export class QuestionFilterComponent implements OnInit {


  @Output('onClosed')
  private onClosed = new EventEmitter<boolean>();

  constructor(public tagStore: TagStore) {
  }

  ngOnInit() {
  }

  public closeCard(event) {
    this.onClosed.emit(event);
  }

}
