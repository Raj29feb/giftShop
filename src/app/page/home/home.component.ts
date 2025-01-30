import { Component, effect, OnInit, signal, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from '../../Components/card/card.component';
import { ApiServiceService } from '../../api-service.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../Components/footer/footer.component';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-home',
  imports: [
    MaterialModule,
    MatCheckboxModule,
    CardComponent,
    CommonModule,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('rangeSlider') rangeSlider!: MatSlider; // Access the slider
  data = [];
  filteredData = this.data;
  totalNumberOfProducts = 0;
  giftFor = signal(''); //the selected gift for option
  occ = signal('');
  relationship = signal('');
  budget = signal('');
  sliderStartValue: number = 0;
  sliderEndValue: number = 1000;
  giftWrapping: Array<string> = [];
  giftWrappingIds: Array<string> = [];
  interestFilters: Array<string> = [];
  interestFiltersIds: Array<string> = [];
  socialInterestFiltersIds: Array<string> = [];
  socialInterestsFilters: Array<string> = [];
  colorFilters: Array<string> = [];
  colorFiltersIds: Array<string> = [];

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
    { name: 'Neutrals', code: '#e8dcca' },
    { name: 'White', code: 'white' },
    { name: 'Black', code: 'black' },
    { name: 'Silver', code: '#c4cace' },
    { name: 'Gold', code: '#d4af37' },
    { name: 'Blue', code: '#0860a8' },
    { name: 'Brown', code: '#816032' },
    { name: 'Green', code: '#008000' },
    { name: 'Orange', code: '#ffa500' },
    { name: 'Pink', code: '#ffc0cb' },
    { name: 'Purple', code: '#800080' },
    { name: 'Red', code: '#f00' },
    { name: 'Yellow', code: '#ffff00' },
    {
      name: 'Multicolor',
      code: 'linear-gradient(180.98deg, rgb(255, 0, 0) 0.84%, rgb(250, 240, 0) 23.89%, rgba(36, 255, 0, 0.616) 45.4%, rgba(0, 255, 240, 0.37) 68.78%, rgb(51, 0, 255) 88.43%, rgb(255, 0, 245) 94.57%);',
    },
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
  setData(index: number) {
    const url = `https://api.toandfrom.com/v2/product?page=${
      index + 1
    }&offset=${index * 25 ? index * 25 - 1 : 0}&limit=24`;
    this.api.getProducts(url).subscribe({
      next: (response: any) => {
        // Handle successful response
        this.totalNumberOfProducts = response.total;
        console.log('the data that we got from the api::', response.data);
        this.data = response.data;
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

  //page event below

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.setData(e.pageIndex);
  }

  //format label to show the marker along with $ sign before
  formatLabel(value: number): string {
    return `$${value}`;
  }

  constructor(private api: ApiServiceService) {}
  ngOnInit(): void {
    //demo data from "/assets/products.json"
    //orignal data from  "https://api.toandfrom.com/v2/product?page=1&offset=0&limit=24"
    this.setData(0);
  }
  handleSignatureWrapping(targetElem: string) {
    const closeElem: any = document.getElementById(targetElem);
    closeElem.style.display = 'inline';

    //getting the text of the gift wrapping filter
    const Elem: any = document.getElementById(targetElem + 'name');
    if (targetElem.includes('giftWrapping')) {
      this.giftWrapping.push(Elem.textContent);
      this.giftWrappingIds.push(targetElem);
    }
    if (
      targetElem.includes('interests') &&
      !targetElem.includes('social_interests')
    ) {
      this.interestFilters.push(Elem.textContent);
      this.interestFiltersIds.push(targetElem);
    }
    if (targetElem.includes('social_interests')) {
      this.socialInterestsFilters.push(Elem.textContent);
      this.socialInterestFiltersIds.push(targetElem);
    }
  }
  //handle color click selection
  handleColorSelection(targetElem: string) {
    const colorElem: any = document.getElementById(targetElem);

    //get the attribute vlaue data-color
    const colorValue = colorElem.getAttribute('data-color');
    //if the color and the elem id exits in their respective arrays delete them from there arrays and change the shadow to none indicating
    //the deselection of that color filter.
    if (
      this.colorFilters.includes(colorValue) &&
      this.colorFiltersIds.includes(targetElem)
    ) {
      colorElem.style.boxShadow = 'none';
      this.colorFilters.splice(
        this.colorFilters.findIndex((color) => color == colorValue),
        1
      );
      this.colorFilters.splice(
        this.colorFiltersIds.findIndex((id) => id == targetElem),
        1
      );
    }
    //if the color and the elem id does not exits in their respective arrays add them in there respective
    //  arrays and change the shadow to the pink color indicating
    //the selection of that color filter.
    else {
      colorElem.style.boxShadow =
        'rgb(255, 255, 255) 0px 0px 10px 0px, rgb(255, 0, 255) 0px 0px 10px 0px, rgb(255, 255, 0) 0px 0px 10px 0px';
      this.colorFilters.push(colorValue);
      this.colorFiltersIds.push(targetElem);
    }
  }
  closeSignatureWrapping(targetElem: string) {
    event?.stopPropagation();
    const closeElem: any = document.getElementById(targetElem);
    closeElem.style.display = 'none';
    //get the text of the unselected filter and filter it out from the choosen giftWrapping
    const unchosenFilter: any = document.getElementById(targetElem + 'name');
    const unchosenFilterText = unchosenFilter?.textContent;

    if (targetElem.includes('giftWrapping')) {
      this.giftWrapping = this.giftWrapping.filter(
        (giftWrap) => giftWrap != unchosenFilterText
      );
    }
    if (
      targetElem.includes('interests') &&
      !targetElem.includes('social_interests')
    ) {
      this.interestFilters = this.interestFilters.filter(
        (giftWrap) => giftWrap != unchosenFilterText
      );
      // this.numberOfInterestFiltersSelected--;
    }
    if (targetElem.includes('social_interests')) {
      this.socialInterestsFilters = this.socialInterestsFilters.filter(
        (giftWrap) => giftWrap != unchosenFilterText
      );
    }
  }
  //close all signature wrapping
  closeAllSignatureWrapping() {
    event?.stopPropagation();
    this.giftWrappingIds.forEach((ids) => {
      //display none the x symbol from all the gift wrapping filters
      const closeElem: any = document.getElementById(ids);
      closeElem.style.display = 'none';
    });
    this.giftWrapping = [];
    this.giftWrappingIds = [];
  }
  //close all interests filters
  closeAllInterestFilters() {
    event?.stopPropagation();
    this.interestFiltersIds.forEach((ids) => {
      //display none the x symbol from all the gift wrapping filters
      const closeElem: any = document.getElementById(ids);
      closeElem.style.display = 'none';
    });
    this.interestFiltersIds = [];
    this.interestFilters = [];
  }
  //close all interests filters
  closeAllSocialInterestFilters() {
    event?.stopPropagation();
    this.socialInterestFiltersIds.forEach((ids) => {
      //display none the x symbol from all the gift wrapping filters
      const closeElem: any = document.getElementById(ids);
      closeElem.style.display = 'none';
    });
    this.socialInterestFiltersIds = [];
    this.socialInterestsFilters = [];
  }
  //close all color filters
  closeAllColorFilters() {
    event?.stopPropagation();
    this.colorFiltersIds.forEach((ids) => {
      //display none the x symbol from all the gift wrapping filters
      const colorElem: any = document.getElementById(ids);
      colorElem.style.boxShadow = 'none';
      // colorElem.style.boxShadow =
      //   'rgb(255, 255, 255) 0px 0px 10px 0px, rgb(255, 0, 255) 0px 0px 10px 0px, rgb(255, 255, 0) 0px 0px 10px 0px';
    });
    this.colorFiltersIds = [];
    this.colorFilters = [];
  }
  //function to set the value of sliderStartThumb
  handleStartThumb() {
    const e = event?.target as HTMLInputElement;
    // console.log('start thumb value::', e.value);
    this.sliderStartValue = Number(e.value);
    this.bothThumbValues();
  }
  //function to set the value of sliderStartThumb
  handleEndThumb() {
    const e = event?.target as HTMLInputElement;
    // console.log('end thumb value::', e.value);
    this.sliderEndValue = Number(e.value);
    this.bothThumbValues();
  }
  //get the value of both the slider thumbs together
  bothThumbValues() {
    // console.log(
    //   'start thumb::',
    //   this.sliderStartValue,
    //   'end thumb::',
    //   this.sliderEndValue
    // );
    //set the buget filter to be displayed
    this.budget.set(`$${this.sliderStartValue}-$${this.sliderEndValue}`);
  }
  //remove giftFor filter
  removeGiftForFilter() {
    this.giftFor.set('');
  }
  //remove giftFor filter
  removeOccassionFilter() {
    this.occ.set('');
  }
  //remove giftFor filter
  removeRelationFilter() {
    this.relationship.set('');
  }
  //remove giftFor filter
  removeAllTheFilters() {
    this.removeGiftForFilter();
    this.removeOccassionFilter();
    this.removeRelationFilter();
    this.removeBudgetFilter();
    this.removeGiftWrappingFilter();
    this.removeInterestsFilter();
    this.removeSocialInterestsFilter();
    this.removeColorFilters();
  }
  removeBudgetFilter() {
    this.budget.set('');
    this.sliderStartValue = 0;
    this.sliderEndValue = 1000;
  }
  removeGiftWrappingFilter() {
    this.closeAllSignatureWrapping();
  }
  removeInterestsFilter() {
    this.closeAllInterestFilters();
  }
  removeSocialInterestsFilter() {
    this.closeAllSocialInterestFilters();
  }
  removeColorFilters() {
    this.closeAllColorFilters();
  }
}
