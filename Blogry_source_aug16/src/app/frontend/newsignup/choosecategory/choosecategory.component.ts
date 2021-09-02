import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/classes/category';
import { AuthService } from 'src/app/services/auth.service';
import { BlogsService } from '../../service/blogs.service';

@Component({
  selector: 'app-choosecategory',
  templateUrl: './choosecategory.component.html',
  styleUrls: ['./choosecategory.component.css']
})
export class ChoosecategoryComponent implements OnInit {

  all_categories: Category[] = [];
  selectedCategoriesList: any[] = [];
  user_categories: any[] = [];

  colorCodes = [
    '#8B0000',
    '#A52A2A',
    '#B22222',
    '#DC143C',
    '#FF0000',
    '#FF6347',
    '#FF7F50',
    '#CD5C5C',
    '#F08080',
    '#E9967A',
    '#FA8072',
    '#FFA07A',
    '#FF4500',
    '#FF8C00',
    '#FFA500',
    '#FFD700',
    '#B8860B',
    '#DAA520',
    '#EEE8AA',
    '#BDB76B',
    '#F0E68C',
    '#808000',
    '#FFFF00',
    '#9ACD32',
    '#556B2F',
    '#6B8E23',
    '#7CFC00',
    '#7FFF00',
    '#ADFF2F',
    '#006400',
    '#008000',
    '#228B22',
    '#00FF00',
    '#32CD32',
    '#90EE90',
    '#98FB98',
    '#8FBC8F',
    '#00FA9A',
    '#00FF7F',
    '#2E8B57',
    '#66CDAA',
    '#3CB371',
    '#20B2AA',
    '#2F4F4F',
    '#008080',
    '#008B8B',
    '#00FFFF',
    '#00FFFF',
    '#E0FFFF',
    '#00CED1',
    '#40E0D0',
    '#48D1CC',
    '#AFEEEE',
    '#7FFFD4',
    '#B0E0E6',
    '#5F9EA0',
    '#4682B4',
    '#6495ED',
    '#00BFFF',
    '#1E90FF',
    '#ADD8E6',
    '#87CEEB',
    '#87CEFA',
    '#191970',
    '#000080',
    '#00008B',
    '#0000CD',
    '#0000FF',
    '#4169E1',
    '#8A2BE2',
    '#4B0082',
    '#483D8B',
    '#6A5ACD',
    '#7B68EE',
    '#9370DB',
    '#8B008B',
    '#9400D3',
    '#9932CC',
    '#BA55D3',
    '#800080',
    '#D8BFD8',
    '#DDA0DD',
    '#EE82EE',
    '#FF00FF',
    '#DA70D6',
    '#C71585',
    '#DB7093',
    '#FF1493',
    '#FF69B4',
    '#FFB6C1',
    '#FFC0CB',
    '#FAEBD7',
    '#F5F5DC',
    '#FFE4C4',
    '#FFEBCD',
    '#F5DEB3',
    '#FFF8DC',
    '#FFFACD',
    '#FAFAD2',
    '#FFFFE0',
    '#8B4513',
    '#A0522D',
    '#D2691E',
    '#CD853F',
    '#F4A460',
    '#DEB887',
    '#D2B48C',
    '#BC8F8F',
    '#FFE4B5',
    '#FFDEAD',
    '#FFDAB9',
    '#FFE4E1',
    '#FFF0F5',
    '#FAF0E6',
    '#FDF5E6',
    '#FFEFD5',
    '#FFF5EE',
    '#F5FFFA',
    '#708090',
    '#778899',
    '#B0C4DE',
    '#E6E6FA',
    '#FFFAF0',
    '#F0F8FF',
    '#F8F8FF',
    '#F0FFF0',
    '#FFFFF0',
    '#F0FFFF',
    '#FFFAFA',
    '#000000',
    '#696969',
    '#808080',
    '#A9A9A9',
    '#C0C0C0',
    '#D3D3D3',
    '#DCDCDC',
    '#F5F5F5',
    '#FFFFFF',
  ];
  getRandomDifferent(arr: any[], last = undefined) {
    if (arr.length === 0) {
      return;
    } else if (arr.length === 1) {
      return arr[0];
    } else {
      let num = 0;
      do {
        num = Math.floor(Math.random() * arr.length);
      } while (arr[num] === last);
      return arr[num];
    }
  }

  constructor(public blogService: BlogsService, private authService: AuthService) {
  }


  selectCategory(index: number, catId: string) {
    // console.log(index, catId);
    if (this.selectedCategoriesList.includes(catId, 0)) {
      // this.selectedCategoriesList.
      var index = this.selectedCategoriesList.indexOf(catId);
      this.selectedCategoriesList.splice(index, 1);
    } else {
      this.selectedCategoriesList.push(catId);
    }
    console.log(this.selectedCategoriesList)
  }

  ifSelected(categoryName: string) {
    if (this.selectedCategoriesList.includes(categoryName, 0)) {
      return true
    }
    return false
  }
  userHaveCategory(categoryName: string) {
    if (this.user_categories.includes(categoryName, 0)) {
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.authService.userProfile.subscribe((userdata: any) => {
      console.log(userdata);
      this.user_categories = userdata.selected_category;
      if(userdata.selected_category.length > 0) {
        this.user_categories.forEach((cat) => {
          this.selectedCategoriesList.push(cat)
        })
        // this.selectedCategoriesList.push(userdata.selected_category);
      }
    })
    this.blogService.allCategories.subscribe(categories => {
      console.log(categories)
      this.all_categories = categories;
    })
  }

  saveUserCategories() {
    if (this.selectedCategoriesList.length > 0) {
      const data = {
        "selected_category": this.selectedCategoriesList
      }
      this.authService.saveUserCategories(data);
    }
  }

}
