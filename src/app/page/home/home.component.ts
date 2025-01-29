import { Component, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from '../../Components/card/card.component';
import { ApiServiceService } from '../../api-service.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../Components/footer/footer.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  imports: [
    MaterialModule,
    MatCheckboxModule,
    CardComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data = [];
  filteredData = this.data;

  //show per page 25 items.
  //using angular mui for pagination

  startThumb = 0;
  readonly panelOpenState = signal(false);
  signature_wrapping = false;
  endThumb = 1000;
  gifts = ['To&From Signature Wrapping'];
  interests = [
    { name: 'Handbags, Wallets & Accessories', icon: 'local_mall' },
    { name: 'Botanicals', icon: 'compost' },
    { name: 'Jewelry', icon: 'diamond' },
    { name: 'Something for the Home', icon: 'home' },
    { name: 'Outdoor Fun', icon: 'outdoor_grill' },
    { name: 'Personalized Gifts', icon: 'redeem' },
    { name: 'Health & Fitness', icon: 'self_improvement' },
    { name: 'Sports', icon: 'sports_soccer' },
    { name: 'Loungewear', icon: 'weekend' },
    { name: 'Beauty', icon: 'face' },
    { name: 'Travel', icon: 'flight' },
    { name: 'Accessories for the Cold', icon: 'ac_unit' },
    { name: 'Gadgets', icon: 'devices_other' },
    { name: 'Pets', icon: 'pets' },
    { name: 'Food & Drink', icon: 'restaurant' },
    { name: 'Experiences', icon: 'psychology' },
    { name: 'Art & Craft', icon: 'palette' },
    { name: 'Apparel', icon: 'checkroom' },
  ];
  social_interests = [
    { name: 'Eco Focus', icon: 'eco' },
    { name: 'Black Founder', icon: 'man' },
    { name: 'Female Founder', icon: 'woman' },
    { name: 'BIPOC Founder', icon: 'groups' },
    { name: 'B Crop', icon: 'format_bold' },
    { name: 'Vegan', icon: 'grass' },
    { name: 'Give Back', icon: 'volunteer_activism' },
    { name: 'Artisan', icon: 'person_apron' },
    { name: 'Small Business', icon: 'corporate_fare' },
  ];
  colors = [
    '#e8dcca',
    'white',
    'black',
    '#c4cace',
    '#d4af37',
    '#0860a8',
    '#816032',
    '#008000',
    '#ffa500',
    '#ffc0cb',
    '#800080',
    '#f00',
    '#ffff00',
    'linear-gradient(180.98deg, rgb(255, 0, 0) 0.84%, rgb(250, 240, 0) 23.89%, rgba(36, 255, 0, 0.616) 45.4%, rgba(0, 255, 240, 0.37) 68.78%, rgb(51, 0, 255) 88.43%, rgb(255, 0, 245) 94.57%);',
  ];
  occasions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Graduation',
    'New Job',
    'Housewarming',
    'Baby Shower',
    'Holiday',
    'Get Well Soon',
    'Just Because',
    'Sympathy',
    'Congratulations',
    'Thank You',
    'Love',
    'Friendship',
  ];
  giftForOptions = false;
  selected = 'option2';

  //set the data according to the page patch of 25 products
  setFilteredData(pageIndex: number) {
    const minPrdIndex = pageIndex * 25;
    const maxPrdIndex = (pageIndex + 1) * 25 - 1;
    this.filteredData = this.data.filter((prd, index) => {
      if (index >= minPrdIndex && index <= maxPrdIndex) {
        return prd;
      }
    });
  }

  //page event below

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.setFilteredData(e.pageIndex);
  }

  //format label to show the marker along with $ sign before
  formatLabel(value: number): string {
    return `$${value}`;
  }

  constructor(private api: ApiServiceService) {}
  ngOnInit(): void {
    this.api.getProducts('/assets/products.json').subscribe({
      next: (response: any) => {
        // Handle successful response
        this.data = response.products;
        this.filteredData = this.data;
      },
      error: (error) => {
        // Handle error
        console.error('Error fetching data:', error);
      },
      complete: () => {
        // Handle completion (optional)
        console.log('Data fetched successfully.');
      },
    });
  }
  handleSignatureWrapping(targetElem: string) {
    // console.log(targetElem);
    const closeElem: any = document.getElementById(targetElem);
    // console.log(closeElem);
    closeElem.style.display = 'inline';
  }
  closeSignatureWrapping(targetElem: string) {
    event?.stopPropagation();
    const closeElem: any = document.getElementById(targetElem);
    closeElem.style.display = 'none';
  }
}
