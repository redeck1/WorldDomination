function Country() {
  this.lvl = 100;
  this.name = "ppi";
  this.log = function () {
    return 123;
  };
}

const c = new Country();
const copy = structuredClone(c);

console.log(copy.log());
