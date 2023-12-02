const queue = () => {
    let array = [1, 2, 3, 4]
    console.log(array)
    
    const enqueue = function (v){
        console.log("be patient", v, "...")   //enqueueing in process
        array.unshift(v)
        console.log(array)
    }

    enqueue(5)
    enqueue(6)

    const dequeue = function (v){
        console.log("stuff is happening(its magic)...")   //dequeueing in process
        array.shift()
        console.log(array)
    }
    
    dequeue()
    dequeue()

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
            enqueue(value)
        } else {
            dequeue()
        };
    }

    rndm();

    const x = {
        rndm,
        enqueue,
        dequeue
    };
}

queue();