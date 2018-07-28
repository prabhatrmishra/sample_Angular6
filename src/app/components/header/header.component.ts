import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ce-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideHeader = false;

  constructor(
    private title: Title,   
    private router: Router,
    private activatedRoute: ActivatedRoute    
  ) { }

  ngOnInit() {
    this.router
      .events
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });

    this.router
      .events
      .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data) {
            return child.snapshot.data;
          } else {
            return null;
          }
        }
        return null;
      })).subscribe((data: any) => {
        console.log(data);
        this.title.setTitle(data.title);
        this.hideHeader = !!!data.hideHeader;
      });
  }

}
