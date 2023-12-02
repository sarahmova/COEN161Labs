function Node(v, next){
    if(next===null){
        next=null
    };

    return {
        v: v,
        next: next,
    };
}

function linkedlist(){
    let head = null
    const prepend = function(v){
        if(head===null){
            head=Node(v);
        } else {
            let x = Node(v, head);
            head=x;
        }
    }

    prepend(1)
    prepend(324)
    console.log(head)


    const deleteMatching = function(v){
        let current = head
        while (current.next!==null){
            if(current.next.v===v){
                current.next = current.next.next
            }
            else {
                current=current.next
            }
        }
    }

    const traverse = (fn)=> {
        let current = head
        while(current!==null){
            fn(current)
        }
    }

    return {
       prepend,
       deleteMatching,
       traverse
    };
}

linkedlist();