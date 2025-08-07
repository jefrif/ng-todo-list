import {Injectable} from '@angular/core';
import {Task} from "../domain/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  products: Task[] = [];

  constructor() {
    this.products.push(new Task('Taking a bath', false, 1));
    this.products.push(new Task('Wearing clothes', false, 2));
    this.products.push(new Task('Combing my hair', false, 3));
  }

  // Function that returns a Promise
  fetchData() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation (e.g., fetching data from an API)
      setTimeout(() => {
        const success = true; // Simulate success or failure

        if (success) {
          resolve(this.products); // Resolve the Promise with a value
        } else {
          reject("Error: Failed to fetch data."); // Reject the Promise with an error
        }
      }, 2000); // Simulate a 2-second delay
    });
  }
}
