class array {
  constructor(size) {
    this.size = size;
    this.array = Array(size).fill(null);
    this.count = 0;
  }
  add(data) {
    if (this.count < this.size) {
      this.array[this.count] = data;
      this.count++;
      return true;
    }
    console.error("array is full!!");
  }
  removeLast() {
    if (this.count === 0) {
      console.error("array is empty!!");
      return null;
    }
    const lastElement = this.array[this.count - 1];
    this.array[this.count - 1] = null;
    this.count--;
    // return should removed
    return lastElement;
  }
  set(index, value) {
    if (index >= 0 && index < this.count) {
      this.array[index] = value;
    } else {
      console.error("index out of range!!");
    }
  }

  get(index) {
    if (index >= 0 && index < this.count) return this.array[index];
    console.error("index out of range!!");
  }
  swap(i, j) {
    if (i >= 0 && i < this.count && j >= 0 && j < this.count) {
      const temp = this.array[i];
      this.array[i] = this.array[j];
      this.array[j] = temp;
    } else {
      console.error("index out of range!!");
    }
  }
  length() {
    return this.count;
  }
}
class maxHeap {
  constructor(size) {
    this.heap = new array(size);
  }

  parent(i) {
    return ((i - 1) / 2) | 0;
  }

  leftChild(i) {
    return 2 * i + 1;
  }

  rightChild(i) {
    return 2 * i + 2;
  }

  increaseKey(i, key) {
    if (key < this.heap.get(i)) {
      console.error("new key is smaller than current key!");
      return;
    }
    this.heap.set(i, key);
    while (i > 0 && this.heap.get(this.parent(i)) < this.heap.get(i)) {
      this.heap.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  insert(key) {
    this.heap.add(parseFloat("-inf"));
    this.increaseKey(this.heap.length() - 1, key);
  }

  heapify(i) {
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    let largest = i;
    if (left < this.heap.length() && this.heap.get(left) > this.heap.get(i)) {
      largest = left;
    }
    if (
      right < this.heap.length() &&
      this.heap.get(right) > this.heap.get(largest)
    ) {
      largest = right;
    }
    if (largest != i) {
      this.heap.swap(i, largest);
      this.heapify(largest);
    }
  }
  deleteMax() {
    if (this.heap.length() < 1) {
      console.error("heap underflow!")
      return null;
    }
    const maxValue = this.heap.get(0);
    const lastElement = this.heap.removeLast();
    if (this.heap.length() > 0) {
      this.heap.set(0, lastElement);
      this.heapify(0);
    }
    return maxValue;
  }
}
