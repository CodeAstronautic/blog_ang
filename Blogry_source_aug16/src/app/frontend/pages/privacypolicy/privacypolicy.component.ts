import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['../pages.component.css','./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {

  pageData = this.pageService.privacyPage;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.pageService.getPage('privacy_policy').subscribe((pagedata: any) => {
      if(pagedata.page[0].content) {
        this.pageData = pagedata.page[0].content;
      }
    })
  }

}
