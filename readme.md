# IterQueue

IterQueue is a asynchronous queue that can be read as an asynchronous iterator.
This class supports enqueueing items, buffering when not being read, and provides a method to end the queue.

## Features

- **Asynchronous Iterator**: Allows for `for await...of` loops to consume items.
- **Enqueue Method**: Adds items to the queue.
- **Buffering**: Buffers items when not being read.
- **End Method**: Signals the end of the queue, allowing for graceful termination.

## Usage

### Installation

`npm i iterqueue`

### Example

Below is an example demonstrating how to use the `AsyncQueue` class:

```javascript
import IterQueue from "iterqueue";
const queue = new IterQueue();
// Enqueue items
setTimeout(() => queue.enqueue(1), 100);
setTimeout(() => queue.enqueue(2), 200);
setTimeout(() => queue.enqueue(3), 300);
setTimeout(() => queue.end(), 400);

// Consume items
for await (const item of queue) {
  console.log(item);
}

console.log("Queue has ended.");
```

### Methods

#### `enqueue(item)`

Adds an item to the queue. If the queue has been ended, an error is thrown.

- **Parameters**:
  - `item` (any): The item to be added to the queue.

#### `end()`

Signals the end of the queue. This method resolves all pending promises and ensures that future calls to the iterator return `{ value: undefined, done: true }`.

### Iterator Protocol

The `AsyncQueue` class implements the asynchronous iterator protocol, allowing it to be used in `for await...of` loops. The `next` method returns a promise that resolves with the next item from the queue, or indicates the end of the queue if it has been ended.

### Error Handling

- **Enqueue on Ended Queue**: An error is thrown if `enqueue` is called after the queue has been ended.
- **End Already Ended Queue**: An error is thrown if `end` is called multiple times.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to customize and expand this README based on your project's specific needs and usage scenarios.
