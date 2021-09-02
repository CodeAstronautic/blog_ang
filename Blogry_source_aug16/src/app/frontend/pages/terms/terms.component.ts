import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['../pages.component.css', './terms.component.css']
})
export class TermsComponent implements OnInit {

  pageData = this.pageService.termPage;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.getPage('terms_and_conditions').subscribe((pagedata: any) => {
      if(pagedata.page[0].content) {
        this.pageData = pagedata.page[0].content;
      }
    })
  }

}
