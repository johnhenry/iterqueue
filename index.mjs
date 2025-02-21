class IterQueue {
  constructor() {
    this.queue = [];
    this.resolvers = [];
    this.ended = false;
  }

  // Method to enqueue data into the queue
  enqueue(item) {
    if (this.ended) {
      throw new Error("Cannot enqueue on a closed queue.");
    }
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve({ value: item, done: false });
    } else {
      this.queue.push(item);
    }
  }

  // Method to end the queue
  end() {
    if (this.ended) {
      throw new Error("Queue already ended.");
    }
    this.ended = true;
    // Resolve all pending promises with done: true
    while (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve({ value: undefined, done: true });
    }
  }

  // Method to create an asynchronous iterator
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.queue.length > 0) {
          const value = this.queue.shift();
          return Promise.resolve({ value, done: false });
        }
        if (this.ended) {
          return Promise.resolve({ value: undefined, done: true });
        }
        return new Promise((resolve) => {
          this.resolvers.push(resolve);
        });
      },
    };
  }
}

export default IterQueue;
export { IterQueue };
