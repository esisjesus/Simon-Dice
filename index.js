const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const pink = document.getElementById('pink');
const orange = document.getElementById('orange');
const start = document.getElementById('start');
const score = document.getElementById('score');
const highScore = document.getElementById('high')

let highestScore = 0;

class Game {
    constructor(){
        this.init()
        this.newSecuence()
        setTimeout(()=>{
           this.nextLevel() 
        }, 500) 
    }

    init(){
        start.classList.add('hide')
        this.level = 1
        this.maxlevel = 100
        this.sublevel = 0
        this.colores = {
            blue, 
            yellow,
            pink, 
            orange
        }
        this.chooseColor = this.chooseColor.bind(this)
        this.score = 0
        score.innerHTML= `Score:  ${this.score}`
        highScore.innerHTML = `Highest Score: ${highestScore}`
    }
    
    newSecuence(){
        this.secuence = new Array(this.maxlevel).fill(0).map(n => Math.floor(Math.random() * 4))
    
    }
    colorsSecuence(number){
        switch(number){
            case 0:
                return 'blue'
            case 1:
                return 'yellow'
            case 2:
                return 'pink'
            case 3: 
                return 'orange'
        }
    }
    lightColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=> this.turnOff(color), 350)
    }
    turnOff(color){
        this.colores[color].classList.remove('light')
    }
    nextLevel(){
        this.sublevel = 0;
        this.lightSecuence()
        this.eventHandlers()
    }
    lightSecuence(){
        for(let i = 0; i < this.level; i++){
            let color = this.colorsSecuence(this.secuence[i])
            setTimeout(() => this.lightColor(color), 1000 * i)
        }
    }
    eventHandlers(){
        this.colores.blue.addEventListener('click', this.chooseColor);
        this.colores.yellow.addEventListener('click', this.chooseColor);
        this.colores.pink.addEventListener('click', this.chooseColor);
        this.colores.orange.addEventListener('click', this.chooseColor);

        this.colores.blue.classList.add('pointer');
        this.colores.yellow.classList.add('pointer');
        this.colores.pink.classList.add('pointer')
        this.colores.orange.classList.add('pointer')

        
    }
    chooseColor(e){
        const colorName = e.target.dataset.color
        const colorNumber = this.colorToNumber(colorName)
        this.lightColor(colorName)
        if(colorNumber === this.secuence[this.sublevel]){
            this.sublevel++
            this.score += this.level;
            score.innerHTML = `Score:${this.score}`
            this.checkScore()

            if(this.sublevel === this.level){
                const alert = Swal.mixin({
                    didClose: () =>{
                      this.levelUp()  
                    }
                })
                alert.fire({
                    title:'Next Level',
                    text:'You`re awesome!',
                    icon:'success',
                }
                  )
                
                this.checkScore()
            }else if (this.level === this.maxlevel) {
                alert('ganaste!')
                this.checkScore()
            }
        }else{
            
            const alert = Swal.mixin({
                didClose: () =>{
                  this.playAgain()
                }
            })
            alert.fire({
                title:'You lost :(',
                text:'You can try again',
                icon:'error',
                imageUrl: './lostimage.jpeg',
                imageHeight: 200,
                imageWidth: 200,
                imageAlt: 'Crying Selena Gomez'
            })
            this.score = 0
            score.innerHTML = `Score:${this.score}`

        }
    }
    
    levelUp(){
        
        this.level++
        this.blockEventHandlers()
        setTimeout(() => this.nextLevel(), 1500)
    }
    colorToNumber(color){
        switch(color){
            case 'blue':
                return 0
            case 'yellow':
                return 1
            case 'pink':
                return 2
            case 'orange':
                return 3
        }
    }
    blockEventHandlers(){
        this.colores.blue.removeEventListener('click', this.chooseColor)
        this.colores.yellow.removeEventListener('click', this.chooseColor)
        this.colores.pink.removeEventListener('click', this.chooseColor)
        this.colores.orange.removeEventListener('click', this.chooseColor)

        this.colores.blue.classList.remove('pointer');
        this.colores.yellow.classList.remove('pointer');
        this.colores.pink.classList.remove('pointer')
        this.colores.orange.classList.remove('pointer')
    }
    playAgain(){
        this.level = 1
        this.sublevel = 0
        this.secuence = []
        start.classList.remove('hide')
        this.blockEventHandlers()
    }
    checkScore(){
        if(this.score > highestScore){
            highestScore = this.score
            highScore.innerHTML = `High Score: ${highestScore}`
        }
    }
} 

function startGame(){
    let game = new Game()
}

