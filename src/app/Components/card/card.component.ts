import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
} from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MaterialModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  name = `The Shiba Inu is the smallest of the six original and distinct spitz
      breeds of dog from Japan. A small, agile dog that copes very well with
      mountainous terrain, the Shiba Inu was originally bred for hunting.`;
  brand = 'Goldbelly';
  price = '$249.95';
  image = '';
  @Input() prd_detail: any;
  constructor() {}
  fixLength() {
    //make it on html inplace as this will change the orginal data that we never should do.
    const prev_name = this.prd_detail.name;
    this.prd_detail.name = this.prd_detail.name.slice(0, 20);
    if (prev_name.length > 20) {
      this.prd_detail.name = this.prd_detail.name + '...';
    }
  }

  ngOnInit(): void {
    this.fixLength();
    // console.log('data for product::', this.prd_detail);
  }
}
