import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MoneyService} from '../../services/money.service';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-money-panel',
  templateUrl: './money-panel.component.html',
  styleUrls: ['./money-panel.component.scss']
})
export class MoneyPanelComponent implements OnInit {
  @Input() role: string;
  @Output() showCreatePage = new EventEmitter<boolean>();

  constructor(private money: MoneyService,
              private auth: AuthService) {
  }

  private moneyCount: number;
  private showMoney: boolean = false;
  private isManager: boolean = false;
  private nullCount: boolean = false;


  onShowMoney() {
    return this.showMoney = !this.showMoney;
  }

  ngOnInit() {

    if (this.role === 'manager') {
      this.isManager = true
    }
    if (!this.moneyCount && this.role === 'manager') {
      this.money.getManagersMoney().subscribe((item) => {
        if (item === 0) this.nullCount = true;
        this.money.money = item;
        this.moneyCount = this.money.money;
      })
    } else if (!this.moneyCount && this.role === 'employee') {
      this.money.getEmployeeMoney().subscribe((item) => {
        if (item === 0) this.nullCount = true;
        this.money.money = item;
        this.moneyCount = this.money.money;
      })
    } else {
      this.moneyCount = this.money.money;
    }
  }

}
