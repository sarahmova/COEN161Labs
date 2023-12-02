const stack = () => {
    let array = [1, 2, 3, 4]
    console.log(array)
    
    const push = function (v){
        console.log("be patient", v, "...")   //pushing in process
        array.push(v)
        console.log(array)
    }

    push(5)
    push(6)

    const pop = function (v){
        console.log("stuff is happening...")   //popping in process
        array.pop()
        console.log(array)
    }
    
    pop()
    pop()

    const rndm = function (){
        let value = null
        let y = null
        function getRandomInt(max){
            y = Math.floor(Math.random() * max)
            return y;
        }

        console.log(getRandomInt(2))
        value = Math.floor(Math.random() *10000+1)
        console.log(value)

        if(y===0){
            push(value)
        } else {
            pop()
        };
    }

    //if you come into this file to check for whatever reason, know that the wording to this section was crazy confusing so we tried our best

    rndm();


    return {
        rndm,
        push,
        pop
    };
}

stack();