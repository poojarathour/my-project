import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product as ProductService } from '../../services/product';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class Product implements OnInit {
  products = signal<any[]>([]); // ✅ signal reactive array

  constructor(private productService: ProductService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Backend data:', data);

        // ✅ ensure change detection triggers
        this.ngZone.run(() => {
          this.products.set(data);
        });
      },
      error: (err) => console.error('API Error:', err),
    });
  }
}
