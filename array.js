class array {
  constructor(size) {
    this.size = size;
    this.arr = Array(this.size).fill(null);
    this.count = 0;
  }
  insert(data) {
    if (this.count < this.size) {
      this.arr[this.count] = data;
      this.count++;
      return this.count;
    }
    return "array is full!!";
  }

  deleteFirst() {
    return (this.arr[0] = null ? !undefined : "arr is empty");
  }
  deleteLast() {
    return (this.arr[this.count-1] = null ? !undefined : false);
  }

  display() {
    // let res = "";
    this.arr.forEach((element) => {
      if (element !== undefined) console.log(element);
    });
    
  }
}

const arr = new array(5);
arr.insert(3);
arr.insert(4);
arr.insert(5);
// arr.deleteFirst();
console.log(arr.deleteLast());

console.log(arr.display());
