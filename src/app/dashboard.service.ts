import { Subject } from 'rxjs';

export class DashboardService {
  private products = [{name: 'Toscano', value: 30},{name: 'Calisto', value: 45}]
  productsUpdated = new Subject();

  onRemoveProduct(product: object) {
    this.products.forEach((p,i) => {
      if (p === product) { this.products.splice(i,1)}
    });
    this.productsUpdated.next();
  }

  addProduct(product) {
    this.products.push(product);
    this.productsUpdated.next();
  }

  getProducts() {
    return [...this.products];
  }
}