import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogsService } from '../../frontend/service/blogs.service';

@Component({
  selector: 'app-savedblogs',
  templateUrl: './savedblogs.component.html',
  styleUrls: ['./savedblogs.component.css']
})
export class SavedblogsComponent implements OnInit {

  myBlogs!: any[];
  apiUrl = environment.apiUrl;
  defaultPostImage = '../../../../assets/img/defaults/default_thumb.png';
  constructor(private blogService: BlogsService) { }


  async getMySavedBlogs() {
    (await this.blogService.getMySavedBlogs()).subscribe((data: any) => {
      console.log(data)
      this.myBlogs = data;
    })
  }

  ngOnInit(): void {
    this.getMySavedBlogs();
  }

  unsaveBlog(post_id){}

}
