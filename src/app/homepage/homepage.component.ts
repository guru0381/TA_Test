// homepage.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  items: string[] = ['grapes', 'apple', 'milk', 'eggs'];
  selectedItems: string[] = [];
  totalCost: number | null = null;

  constructor(private http: HttpClient) {}

  toggleSelection(item: string): void {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      this.selectedItems.push(item);
    }

    // Fetch cost when items change
    this.fetchCost();
  }

  fetchCost(): void {
    const params = { items: this.selectedItems.join(',') };
    this.http.get<{ totalCost: number }>('/api/cost', { params }).subscribe(
      response => {
        this.totalCost = response.totalCost;
      },
      error => {
        console.error('Error fetching cost:', error);
      }
    );
  }
}
