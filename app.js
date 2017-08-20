// JavaScript source code

/*
Basic Object Creation
---------------------
*/

var customer = {
    name: "Tom Smith Jr",
    speak: function () {
        return "My name is " + this.name + " and I speaks English";
    },
    address: {
        street: "134 A bluemoon",
        city: "pittsburg",
        state: "PA"
    }
};

//acsessing object properties and functions
document.write(customer.speak() + "<br/>");
document.write(customer.name + " lives at " + customer.address.street + "<br/>");
//adding new property to exsisting Customer Object
customer.address.country = "US";
document.write(customer.address.country + "<br/>");




/*
Constructor Function
---------------------
=>If we want to use multiple differnt objects
that can be used across differnt modules similar
to classes in c# then we use constructor function
*/

function Person(name, street) {
    this.name = name;
    this.street = street;
    this.info = function () {
        return "My name is:"+this.name+" and I live on "+this.street;
    }
}
//class Object creation
var bobSmith = new Person("Bob", "Pittsburg");

document.write(bobSmith.info() + "<br/>");
//Checking object instance 
document.write("bobsmith is a person object?"+(bobSmith instanceof Person) + "<br/>");
//to change the value of object property once its created
function changeName(person) {
    person.name = "Sue Smith";
}
changeName(bobSmith);
document.write(bobSmith.info() + "<br/>");
//comparing 2 objects
var person1Obj = new Person("Ruchir","Moradabad");
var person2Obj=new Person("Agnivesh","Muzzafarnagar");
document.write("Person1Obj is equal to Person2Obj?" + (person1Obj === person2Obj)+"<br/>");


/*
Prototype
----------
Every function has a prototype property that is going to 
contain a object,we can add properties and methods to a 
prototype object and whenever we call them they are used 
as if they belong to your object
Also built-in javascript type also have prototype property
prototype property is by the name = __proto__
*/

//To get number of arguments a function contains
function getSum(no1, no2) {
    return no1 + no2;
}

document.write("No. od args getSum contains is:" + getSum.length + "<br/>");
//class Mammal
function Mammal(name) {
    this.name = name;
    this.getInfo = function () {
        return "The Mammal Name is :" + this.name;
    }
}
//acessing prototype property of a funtion
//and adding property and method to it
Mammal.prototype.sound = "Grrrr";
Mammal.prototype.makeSound = function () {
    return this.name+" Says "+this.sound;
}

var grover = new Mammal("Grover");
document.write(grover.makeSound() + "<br/>");
//to list out all the properties of Grover object
for (var prop in grover) {
    document.write(prop + " : " + grover[prop] + "<br/>");
}

//hasOwnProperty() =>used to check if its object own 
//property or not
document.write("name Property of grover : " + grover.hasOwnProperty("name") + "<br/>");//true
document.write("sound Property of grover : " + grover.hasOwnProperty("sound") + "<br/>");//false

//using prototype property of built in javascript object and adding new funtion to it
Array.prototype.inArray = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false;
}

var tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
document.write("4 in array?" + tempArray.inArray(4) + "<br/>");

/*
Private Properties
-------------------
By default ,all properties in an object are public and
we can delete them , however we can make them private 
by declaring them as variable inside the constructor
*/

function SecretCode() {
    var secretNum = 78; //private variable and cannot be accessed outside the class

    this.guessNumber = function (num) {
        if (num > secretNum) {
            return "its higher";
        } else if (num < secretNum) {
            return "its lower";
        } else {
            return "you gussed it right";
        }
    }
}

var seceret = new SecretCode();
document.write("value of secretNum : " + seceret.guessNumber(78) + "<br/>");
document.write(seceret.secretNum+"<br/>");//undifined

/*
getter/setter
--------------

*/
var address = {
    street: "No street",
    city: "No City",
    state: "No State",

    get getAddress() {
        return this.street + ", " + this.city + ", " + this.state;
    },

    set setAddress(theAddress){
        var parts = theAddress.toString().split(", ");
        this.street = parts[0] || "";
        this.city = parts[1] || "";
        this.state = parts[2] || "";
    }
};
address.setAddress = "123 main St, pittsburgh, PA";
document.write("Address:" + address.getAddress+"<br/>");
document.write("City:" + address.city + "<br/>");

//another way of defining setter and getter
function Address() {
    this.street = "";
    this.city = "";
}
//getter
Object.__defineGetter__.call(Address.prototype,
    "getAddress", function () {
        return  this.street + ", " + this.city;
    });
//setter
Object.__defineSetter__.call(Address.prototype,
    "setAddress", function (theAddress) {
        var parts = theAddress.toString().split(',');
        this.street = parts[0];
        this.city = parts[1];
    });
var addressObj = new Address();
addressObj.setAddress = "12 street,London";
document.write("Address:"+addressObj.getAddress + "<br/>");
document.write(addressObj.city + "<br/>");

//another way of defining setter and getter
//not working in current javascript version
/*function Point() {
    this.xPos = 0;
    this.yPos = 0;
}

Object.defineProperties(Point.prototype, "pointPos", {
    get: function () {
        return "X:" + this.xPos + " Y:" + this.yPos;
    },
    set: function (positions) {
        var parts = positions.toString().split(',');
        this.xPos = parts[0]||"";
        this.yPos = parts[1]||"";
    }
});

var pointObj = new Point();
pointObj.pointPos = "100,200";
document.write("Positions:" + pointObj.pointPos);
*/

//ECMA 5.1 version 
var Circle = function (radius) {
    this._radius = radius;
}
//get and set defination
Circle.prototype={
    set radius(radius) { this._radius = radius; },
    get radius() { return this._radius; },
    get area() { return Math.PI * (this._radius * this._radius);}
};

var circleObj = new Circle(10);
circleObj.radius = 15; //set use
document.write("A circle with radius " + circleObj.radius +
    " has an area of " + circleObj.area.toFixed(2) + "<br/>");

/*
Inheritance
------------
To understand inheritance , we need to first understand prototype
Suupose we have a object Dog and we want to use its Name property
but that Name property does'nt exsist inside Dog Object , then it 
is going to search in its prototype Object and if that property does'nt
exsits there also then its going to another object which it has inherited
and if not there then in its prototype and so on.

Animal:name

Dog.prototype =Animal //Inheritance

Dog : bark()
*/

function Animal() {
    this.name = "Animal";
    //toString exsits in main javascript Object
    //this is function over-rinding
    this.toString = function () {
        return "My name is " + this.name;
    };
}

function Canine() {
    this.name = "Canine";
}

function Wolf() {
    this.name = "Wolf";
}

//Multi-level Inheritance
Canine.prototype = new Animal();
Wolf.prototype = new Animal();

//After we override prortotype property of Canine and
//Wolf then its constructor going to point the Main Object Object
//and we need to correct it by re-assigning its construtor back to its
//orignal object
Canine.prototype.constructor = Canine;
Wolf.prototype.constructor = Wolf;

var objWolf = new Wolf();
document.write(objWolf.toString() + "<br/>");

document.write("Wolf instance of Animal :"+(objWolf  instanceof Animal)+ "<br/>");
document.write("objWolf is intance of Wolf :"+(objWolf instanceof Wolf)+ "<br/>");

Animal.prototype.sound = "Grrrrr";
Animal.prototype.getSound = function () {
    return this.name + " says " + this.sound;
}

Wolf.prototype.sound = "Woooooooo";
document.write(objWolf.getSound() + "<br/>");

//better way to above code =>code improvement
function extend(Child, Parent) {
    var Temp = function () { };

    Temp.prototype = Parent.prototype;
    Child.prototype = new Temp;
    Child.prototype.constructor = Child;
}

function Deer() {
    this.name = "Deer";
    this.sound = "Snort";
}

extend(Deer, Animal);
var objDeer = new Deer();

document.write(objDeer.getSound() + "<br/>");

//calling parent method or base class method from drive class
function Vechile() {
    this.name = "no name";
}

Vechile.prototype = {
    drive: function () {
        return this.name + "drives forward";
    },
    stop: function () {
        return this.name + " stops";
    }
};

function Truck(name) {
    this.name = name;
}

Truck.prototype = new Vechile();
Truck.prototype.constructor = Truck;

//assessing base class function
Truck.prototype.drive = function () {
    var driveMsg = Vechile.prototype.drive.apply(this);

    return driveMsg += " through a feild";
}
var objTruck = new Truck("Jeep");
document.write(objTruck.drive() + "<br/>");
document.write(objTruck.stop() + "<br/>");

/*
ES6
*/
//old way
var addStuff = {
    sum: function (num1,num2) {
        return num1 + num2;
    }
};

document.write("1+2="+addStuff.sum(1,2)+ "<br/>");

//Es6 way
var addStuff1 = {
    sum (num1, num2) {
        return num1 + num2;
    }
};

document.write("1+2=" + addStuff1.sum(1, 2) + "<br/>");

//Defining Classes
class Ponter {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    getPosition() {
        return "X: " + this.xPos + " Y:" + this.yPos;
    }
}

var point = new Ponter(10,20);

document.write(point.getPosition() + "<br/>");

//Inheritance in ES6

class Animal1 {
    constructor(name){
        this.name=name;
    }

    toString() {
        return "Animal is " + this.name;
    }

    static getAnimal() {
        return new Animal1("No Name");
    }
}

class Dog extends Animal1 {
    constructor(name, owner) {
        super(name);
        this.owner = owner;
    }

    toString() {
        return super.toString() + "<br/>Dog is named " + this.name;

    }
}

var rover = new Dog("Rover", "jess");

document.write(rover.toString() + "<br/>");

var bowser = Animal1.getAnimal();

document.write("bowser info:" + bowser.toString() + "<br/>");

/*
Design Patterns in Javascript
1.SigleTon Pattern
It is used when we know we are going to create only
one object of sepcific type.
*/

function Hero(name) {
    //checking if the intance already exists or not
    if (typeof Hero.instance === 'object') {
        return Hero.instance;
    }

    this.name = name;
    Hero.instance = this;
    return this;
}

var hero1 = new Hero("Ruchir");
var hero2 = new Hero("Amit");

document.write("hero1 is=" + hero1.name + "<br/>");
document.write("hero2 is=" + hero2.name + "<br/>");

/*Factory Pattern
Factory pattern is used to create different object on request
*/

function Sword(desc) {
    this.weaponType = "Sword";
    this.metal = desc.metal || "Steel";
    this.style = desc.style || "Long-Sword";
    this.hasMagic = desc.hasMagic || false;
}

function Bow(desc) {
    this.weaponType = "Bow";
    this.material = desc.material || "Wood";
    this.style = desc.style || "Long-Bow";
    this.hasMagic = desc.hasMagic || false;
}

function WeaponFactory() { };

WeaponFactory.prototype.makeWeapon = function (desc) {
    var weaponClass = null;

    if (desc.weaponType === "Sword") {
        weaponClass = Sword;
    } else if (desc.weaponType === "Bow") {
        weaponClass = Bow;
    } else {
        return false;
    }

    return new weaponClass(desc);
}

var objWeaponFact = new WeaponFactory();

var bladeFist = objWeaponFact.makeWeapon({
    weaponType: "Sword",
    metal: "Dark Iron",
    style: "Scythe",
    hasMagic:true
});

var longbow = objWeaponFact.makeWeapon({
    weaponType: "Bow",
    material: "Wood",
    style: "long wood",
    hasMagic:false
});

document.write(bladeFist.weaponType +" of type "+
    bladeFist.style + " crafted from " + bladeFist.metal + "<br/>");

document.write(longbow.weaponType + " of type " +
    longbow.style + " crafted from " + longbow.material + "<br/>");


//Decorator Pattern

function Pizza(price) {
    this.price = price || 10;
}

Pizza.prototype.getPrice = function () {
    return this.price;
}

function ExtraCheese(pizza) {
    var prevPrice = pizza.price;

    pizza.price = prevPrice + 1;
}

function ExtraMeat(pizza) {
    var prevPrice = pizza.price;

    pizza.price = prevPrice + 5;
}

var objPizza = new Pizza(12);

ExtraCheese(objPizza);
ExtraMeat(objPizza);
document.write("Cost of Pizza: $" + objPizza.price + "<br/>");

//Observer Pattern

var Observable = function () {
    this.subscribers = [];
}

Observable.prototype = {
    subscribe: function (subscriber) {
        this.subscribers.push(subscriber);
    },
    unSubscribe: function (unSubscriber) {

        for (var i = 0; i <this.subscribers.length ;i++)
        {
            if(this.subscribers[i] === unSubscriber){
                this.subscribers.splice(i,1);
                return unSubscriber.name;
            }
        }
    },

    publish:function(data){
        for(i=0;i<this.subscribers.length;i++){
            this.subscribers[i].receiveData(data);
        }
    }
};

var HCL={
    name:"HCL",
    receiveData:function(data){
        document.write(this.name+" received your info "+data+"<br/>");
    }
}

observable=new Observable();

observable.subscribe(HCL);

observable.publish("IBM at $134.55");

document.write(observable.unSubscribe(HCL) + " Unsubscribed" + "<br/>");

observable.publish("IBM at $139.55");
