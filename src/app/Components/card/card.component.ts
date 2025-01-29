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
  title = `The Shiba Inu is the smallest of the six original and distinct spitz
      breeds of dog from Japan. A small, agile dog that copes very well with
      mountainous terrain, the Shiba Inu was originally bred for hunting.`;
  brand = 'Goldbelly';
  price = '$249.95';
  image = '';
  @Input() prd_detail: any;
  constructor() {}
  fixLength() {
    const prev_title = this.prd_detail.title;
    this.prd_detail.title = this.prd_detail.title.slice(0, 20);
    if (prev_title.length > 20) {
      this.prd_detail.title = this.prd_detail.title + '...';
    }
  }
  ngOnInit(): void {
    this.fixLength();
    console.log('data for product::', this.prd_detail);
  }
}
