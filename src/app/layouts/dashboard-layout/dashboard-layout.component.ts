import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    'use strict';

    $('#sidebarToggle,#sidebarToggleLG,.nav_toggler,.innerCollapsedLink').on(
      'click',
      function (e: any) {
        e.preventDefault();
        $('.collapse').removeClass('show');
        $('body').toggleClass('sidebar_toggled');
      }
    );

    $('.dropdownlink').on('click', function (e: any) {
      e.preventDefault();
      $('body').addClass('sidebar_toggled');
      $('.collapse').removeClass('show');
      $(e.target)
        .parent()
        .find('.collapse')
        .not('.innerList')
        .toggleClass('show');
    });
  }
}
