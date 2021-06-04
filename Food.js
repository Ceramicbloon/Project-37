class FoodF {
  constructor() {
    this.image = loadImage("Milk.png")
    //    this.foodStock = 0
  }

  getState(){
    database.ref("gameState").on("value", (data) => {
      gameState = data.val()
    })


  }



  do(){
    function update(state) {
      database.ref('/').update({
        gameState: state
      })
    }
    console.log(fedTime)
    currentTime = hour();
    if(currentTime == fedTime+1){
      update("playing")
      foodObj.garden()
    } else if(currentTime == fedTime+2){
      update("sleeping")
      foodObj.sleepyhead()
    } else if(currentTime == fedTime+3){
      foodObj.bath();
    } else{
      update("hungry")
    }
    
  }

 

  getFoodStock() {
    database.ref("Food").on("value", (data) => {
      foods = data.val()
    })

  }
  updateFoodStock() {
    if (foods > 0) {
      database.ref('/').update({
        Food: foods - 1,
        fedTime: hour()
      })

    }
  }
  addFood() {
    if (foods < 20) {
      if (foods != undefined) {
        database.ref('/').update({
          Food: foods + 1
        })
      }
    }
  }

  garden(){
    imageMode(CENTER)
    image(garden, 247, 400.5)
  }

  sleepyhead(){
    imageMode(CENTER)
    image(bedroom, 247, 400.5)
  }

  bath(){
    imageMode(CENTER)
    image(bathroom, 247, 400.5)
  }
  display() {
    foodObj.getFoodStock()
    if (foods != 0) {

      var x, y = 150

      for (var i = 0; i < foods; i++) {
        if (i % 10 == 0) {
          x = 23;

          y = y + 64

        }
        image(milk, x, y, 80, 80);
        x = x + 40
      }
    }








  }

}