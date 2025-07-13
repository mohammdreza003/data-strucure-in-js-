class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Linkedlist {
  constructor() {
    this.head = null;
    this.end = null;
  };

  insert(data) {
    const node = new Node(data);
    if (this.head === null) {
      this.head = node;
      this.end = node;
    } else {
      this.end.next = node;
      this.end = node;
    }
  };
  

 

  search(data) {
    let temp = this.head;

    while (temp !== null) {
      if (temp.data && temp.data === data) {
        return temp.data;
      }
      temp = temp.next;
    }
    return false;
  };


  delete(data){
    if (this.head === null)return false;
    if(this.head.data === data){
        this.head = this.head.next;
        return true;
    };

    let temp = this.head;
    while(temp.next != null){
        if (temp.next.data === data) {
            temp.next = temp.next.next;
            return true
        };
        temp = temp.next
    }
    };
    
    display(){
        let temp = this.head;
        while(temp != null){
            process.stdout.write(temp.data + ' -> ');
            temp = temp.next;
        }
    }

}

const list  = new Linkedlist();
list.insert(5);
list.insert(6);
list.insert(8)
list.insert(9);
list.delete(8);
list.insert(10);
list.display();
