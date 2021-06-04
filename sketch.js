//Create variables here
var dog, dog1, happyDog, database, foods, foodStock
var feed, addFood
var fedTime, lastFed
var foodObj
var milk
var garden, bedroom, bathroom
var readState
var gameState
var currentTime
function preload() {
  dog1 = loadImage("Dog.png")
  happyDog = loadImage("HappyDog.png")
  milk = loadImage("Milk.png")
  garden = loadImage("virtual pet images/Garden.png")
  bedroom = loadImage("virtual pet images/Bed Room.png")
  bathroom = loadImage("virtual pet images/Wash Room.png")
  sadDog = loadImage("virtual pet images/Lazy.png")
  //load imaes here
}


function setup() {
  createCanvas(494, 801);


  foodObj = new FoodF()


  database = firebase.database()
  dog = createSprite(247, 600, 20, 20)
  dog.addImage(dog1)
  dog.scale = 0.3

  feed = createButton("Feed")
  feed.position(250, 5)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(300, 5)
  addFood.mousePressed(moreFood)

  
}

// function readStock(data) {
//   foods = data.val()
// }

// function writeStock(x) {

//   if (x <= 0) {
//     x = 0
//   } else {
//     x = x - 1
//   }
//   database.ref('/').update({
//     Food: x
//   })
// }
//foodObj = new Food()
function feedDog() {
  dog.addImage(happyDog)

  foodObj.getFoodStock(foodObj.updateFoodStock())

  //console.log(foods)



}

function moreFood() {
  foodObj.getFoodStock(foodObj.addFood())

}



function draw() {
  background(46, 139, 87)
  // readState = database.ref('gameState')
  // readState.on("value", function(data){
  //   gamestate = data.val()
  // })
  
  if (gameState != undefined) {
    if (gameState != "hungry") {

      feed.hide();
      addFood.hide()
      dog.remove()
    } else {
      feed.show();
      addFood.show();
      dog.addImage(dog1)
      foodObj.display()
    }
  }

  foodObj.getState();
  function update(state) {
    database.ref('/').update({
      gameState: state
    })
  }
  // console.log(fedTime)
  currentTime = hour();
  if (fedTime != undefined) {
    if (currentTime == fedTime + 1) {
      update("playing")
      foodObj.garden()
    } else if (currentTime == fedTime + 2) {
      update("sleeping")
      foodObj.sleepyhead()
    } else if (currentTime == fedTime + 3) {
      foodObj.bath();
    } else {
      update("hungry")
    }
  }
  textSize(20)
  fill("white")




  // console.log(gameState)
  fedTime = database.ref('fedTime')
  fedTime.on("value", function (data) {
    fedTime = data.val();
    //console.log(fedTime)
    if (fedTime >= 12) {
      text("Last fed: " + fedTime % 12 + " PM", 100, 25)
    } else if (fedTime === 0) {
      text("Last fed: 12 AM", 100, 25)
    } else {
      text("Last fed: " + fedTime + " AM", 100, 25)
    }
  })



  drawSprites();
  //foodObj.display();
  //add styles here
  imageMode(CENTER)
  //image(milk, 720, 220, 70, 70)





}



