export class SingleElement {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildElement;

  constructor(element: {id: string, int: number, float: number, color: string, child: ChildElement}) {
    this.id = element.id;
    this.int = element.int;
    this.float = element.float;
    this.color = element.color;
    this.child = element.child;
  }

  setNewId(newId: string) {
    this.id = newId;
  }
}

export class ChildElement {
  id: string;
  color: string;

  constructor(id: string, color: string) {
    this.id = id;
    this.color = color;
  }
}
