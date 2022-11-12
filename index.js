class Comments
{
    
    collection = [];


    constructor(key)
    {
        this.key = key;
        this.collection = JSON.parse(localStorage.getItem(this.key)) ?? [];
    }

    add(model){
        this.collection.push(model)
        this.updateStore();
    }

    delete(id)
    {
        this.collection = this.collection.filter(reservation=>reservation.id!=id)
        this.updateStore();
    }
 
     update(model){
        this.collection = this.collection.map(reservation=>model.id==reservation.id?model:reservation)    
        this.updateStore();
    }
  
    getModel(id)
    {
        for(let i=0;i<this.getCollection.length;i++)
        {
            if(id==this.getCollection[i].id)
            {
                return this.collection[i];
            }
        }
    }

    get getCollection(){
        return JSON.parse(localStorage.getItem(this.key))
    }

    updateStore()
    {
        localStorage.setItem(this.key,JSON.stringify(this.collection))
    }

    MaxId()
    {
        if(!this.collection.length) return 0
        let maxId = this.collection.reduce((acc,current)=>acc>current.id?acc:current.id,0)
        return maxId;
    }



}

let username  = document.getElementById("username")
let comment  = document.getElementById("comments")
let output = document.getElementById("output")
let obj = {
   
}


let comments = new Comments("commentList")
display();
function display()
{
    
 
    console.log(comments.getCollection)
 
        output.innerHTML="<h2 align='center'> no comment  here </h2>"

        if(comments.getCollection.length>0)
    {
        output.innerHTML = ""
    comments.getCollection.forEach(element => {
       
        output.innerHTML+= `
        <div class="comment">
                    <h3>${element.username} &nbsp;<i class="fa-solid fa-user user"></i> </h3>
                    <p>${element.comment}</p>
                    <div class="btn-col">
                        <span>${element.likes}</span>
                        <button class="btn btn-like" onclick="like(${element.id},this)"><i class="fa-solid fa-thumbs-up"></i></button>
                        <span>${element.dislike}</span> 
                        <button class="btn btn-dislike" onclick ="dislike(${element.id})"><i class="fa-solid fa-thumbs-down"></i></button>
                        <button class="btn btn-delete delete" onclick="deleteComment(${element.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
        `
    });
}
}

function Add()
{
    if(!username.value || !comment.value)
    {
        alert("Fill user details completely")
    }
 else{
    obj.id = comments.MaxId() + 1;
     obj.username = username.value;
     obj.comment = comment.value;
     obj.likes=0
    obj.dislike=0
     comments.add(obj);
     alert("Comment added Successfully")
     username.value = ""
     comment.value = ""
     obj ={};
     display();
 }
}
function deleteComment(id)
{
    event.target.style.scale = "1.3"   

    setTimeout(()=>{
    comments.delete(id)
    display();
    
 },200)
}

function like(id)
{
    event.target.style.scale = "1.4"
   setTimeout(()=>{
    let model = comments.getModel(id)
    model.likes = model.likes + 1 ;
   comments.updateStore()  
   display();  
   },100)
}

function dislike(id)
{
    event.target.style.scale = "1.4"
    setTimeout(()=>{
        let model = comments.getModel(id)
    model.dislike = model.dislike + 1 ;
   comments.updateStore() 
    display(); 
    },100)
}

