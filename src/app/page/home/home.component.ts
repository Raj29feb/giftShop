import {
  Component,
  effect,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
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
  encryptedGiftForValue = signal<string>(''); //encrypted giftFor value

  occ = signal('');
  encryptedOccValue = signal<string>(''); //encrypted Occ value
  relationship = signal('');
  encryptedRelationshipValue = signal<string>(''); //encrypted giftFor value
  budget = signal('');
  sliderStartValue: number = 0;
  sliderStartValueS = signal<number | string>('');
  sliderEndValue: number = 1000;
  sliderEndValueS = signal<number | string>('');
  giftWrapping: Array<string> = [];
  encryptedGiftWrappingValue = signal<string>('');
  giftWrappingIds: Array<string> = [];
  interestFilters: Array<string> = [];
  interestFiltersIds: Array<string> = [];
  socialInterestFiltersIds: Array<string> = [];
  socialInterestsFilters: Array<string> = [];
  colorFilters: Array<string> = [];
  colorFiltersIds: Array<string> = [];
  //our product filter checkbox
  ourPrd = signal(false);
  //initial current page
  page = signal(1);
  section = false;
  checkSection = signal(this.section);

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
    'Winter Holidays',
    'Retirement',
    'Just Because',
    'Sympathy',
    'Back to School',
    'Thank You',
    'Halloween',
    'Easter',
  ];
  giftForOptions = false;
  selected = 'option2';

  //set the data according to the page patch of 25 products
  // setData(index: number) {
  //   const url = `https://api.toandfrom.com/v2/product?page=${
  //     index + 1
  //   }&offset=${index * 25 ? index * 25 - 1 : 0}&limit=24`;
  //   this.api.getProducts(url).subscribe({
  //     next: (response: any) => {
  //       // Handle successful response
  //       this.totalNumberOfProducts = response.total;
  //       console.log('the data that we got from the api::', response.data);
  //       this.data = response.data;
  //       this.filteredData = this.data;
  //     },
  //     error: (error) => {
  //       // Handle error
  //       console.error('Error fetching data:', error);
  //     },
  //     complete: () => {
  //       // Handle completion (optional)
  //       console.log('Data fetched successfully.');
  //     },
  //   });
  // }

  handleOurPrdFilter() {
    this.ourPrd.set(!this.ourPrd());
  }

  handleSection() {
    this.checkSection.set(this.section);
  }

  //get encrypted  giftForValue
  getGiftForEncryptedValue(giftFor: string): void {
    switch (giftFor) {
      case 'Him':
        this.encryptedGiftForValue.set('59ef0239-67c0-40b2-b61f-936758985b9b');
        break;
      case 'Her':
        this.encryptedGiftForValue.set('5dfe2ef6-bb1e-4613-90ad-be3d6f2e7fb4');
        break;
      case 'Anyone':
        this.encryptedGiftForValue.set('cdb4f47e-da98-4a20-b1bf-c57988cd5d87');
        break;
      default:
        this.encryptedGiftForValue.set('');
    }
  }

  //get encrypted giftWrapping values
  getGiftWrappingEncryptedValue(giftWrapping: string): void {
    switch (giftWrapping.toLowerCase()) {
      case 'To&From Signature Wrapping':
        this.encryptedGiftWrappingValue.set(
          '59ef0239-67c0-40b2-b61f-936758985b9b'
        );
        break;
      default:
        this.encryptedGiftWrappingValue.set('');
    }
  }

  //get encrypted  giftForValue
  getRelationshipEncryptedValue(relationship: string): void {
    switch (relationship.toLowerCase()) {
      case 'friend':
        this.encryptedRelationshipValue.set(
          '80a925bd-ecae-405d-8754-8ff4fec73fe7'
        );
        break;
      case 'spouse / partner':
        this.encryptedRelationshipValue.set(
          'e814e870-134d-48ed-aa4c-8dd05ccc2681'
        );
        break;
      case 'girlfriend / boyfriend':
        this.encryptedRelationshipValue.set(
          '76ef51f3-1208-4470-857f-6645a487e2ac'
        );
        break;
      default:
        this.encryptedRelationshipValue.set('');
    }
  }

  //get encrypted  Occassion Value
  getOccassionEncryptedValue(occassion: string): void {
    switch (occassion.toLowerCase()) {
      case 'birthday':
        this.encryptedOccValue.set('dd43aac7-7057-486b-94ce-6f55cfa0ba6b');
        break;
      case 'anniversary':
        this.encryptedOccValue.set('c1072e76-19e2-41ad-820f-0b399d8643a5');
        break;
      case 'wedding':
        this.encryptedOccValue.set('e1ddbd6a-0243-4617-88d7-9e4d0a79e9e5');
        break;
      case 'graduation':
        this.encryptedOccValue.set('873b67bf-1f34-40be-a10a-de34810076bd');
        break;
      case 'new job':
        this.encryptedOccValue.set('07fcfa76-da44-46c3-858f-d167b567d70f');
        break;
      case 'housewarming':
        this.encryptedOccValue.set('fb14fe7b-2bc9-46b4-bf73-526f2d1f5b7e');
        break;
      case 'baby shower':
        this.encryptedOccValue.set('d04258f3-5a11-49ef-86fc-f2421dbe5738');
        break;
      case 'winter holidays':
        this.encryptedOccValue.set('edcbdf97-9012-4c18-92e0-59d18756a62c');
        break;
      case 'retirement':
        this.encryptedOccValue.set('aa87536e-4c07-414f-a630-c61fc39d2974');
        break;
      case 'just because':
        this.encryptedOccValue.set('978d6b51-1d56-48ba-bc92-df3237f8dd3d');
        break;
      case 'sympathy':
        this.encryptedOccValue.set('3d1815a7-c1cd-48f1-9128-b94283be1254');
        break;
      case 'back to school':
        this.encryptedOccValue.set('e224fdf4-2c62-47f1-b13d-649242e64a39');
        break;
      case 'thank you':
        this.encryptedOccValue.set('0785d692-f521-4f4c-835d-58b46fa54cb1');
        break;
      case 'halloween':
        this.encryptedOccValue.set('fed14831-27c3-4ea6-9e2f-d412d52448b8');
        break;
      case 'easter':
        this.encryptedOccValue.set('aa271b8e-93e1-477e-b872-072205680be2');
        break;
      default:
        this.encryptedOccValue.set('');
    }
  }

  //page event below

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    // this.setData(e.pageIndex);
    this.page.set(e.pageIndex);
  }

  //format label to show the marker along with $ sign before
  formatLabel(value: number): string {
    return `$${value}`;
  }

  //https://api.toandfrom.com/v2/product?page=1&gender=cdb4f47e-da98-4a20-b1bf-c57988cd5d87&offset=0&limit=12

  constructor(private api: ApiServiceService) {
    effect(() => {
      const url = `https://api.toandfrom.com/v2/product?page=${
        this.page() + 1
      }&offset=${this.page() * 25 ? this.page() * 25 - 1 : 0}&limit=24${
        this.checkSection() ? '&segment=Kid' : ''
      }&Gift+Wrapping=${this.encryptedGiftWrappingValue()}&minPrice=${this.sliderStartValueS()}&maxPrice=${this.sliderEndValueS()}&relationship=${this.encryptedRelationshipValue()}&occasion=${this.encryptedOccValue()}&gender=${this.encryptedGiftForValue()}&bigcommerceEnabled=${this.ourPrd()}`;
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
    });

    //onchange of gitFor filter vlaue its encrypted value will also be changed
    effect(() => {
      this.getGiftForEncryptedValue(this.giftFor());
      this.getOccassionEncryptedValue(this.occ());
      this.getRelationshipEncryptedValue(this.relationship());
    });
  }
  ngOnInit(): void {
    //demo data from "/assets/products.json"
    //orignal data from  "https://api.toandfrom.com/v2/product?page=1&offset=0&limit=24"
    // this.setData(0);
  }
  handleSignatureWrapping(targetElem: string) {
    const closeElem: any = document.getElementById(targetElem);
    closeElem.style.display = 'inline';

    //getting the text of the gift wrapping filter
    const Elem: any = document.getElementById(targetElem + 'name');
    if (targetElem.includes('giftWrapping')) {
      this.giftWrapping.push(Elem.textContent);
      this.giftWrappingIds.push(targetElem);
      this.encryptedGiftWrappingValue.set(this.giftWrapping.join(','));
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
      this.encryptedGiftWrappingValue.set(this.giftWrapping.join(','));
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
    this.encryptedGiftWrappingValue.set('');
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
    this.sliderStartValueS.set(this.sliderStartValue * 100);
    this.sliderEndValueS.set(this.sliderEndValue * 100);
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
    this.sliderStartValueS.set('');
    this.sliderEndValueS.set('');
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
