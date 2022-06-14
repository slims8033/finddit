import reddit from "./redditapi";
const searchForm=document.getElementById("search-form");
const searchInput=document.getElementById("search-input");

// adding an event listener on searchform 
searchForm.addEventListener("submit",(e) =>{
   // console.log(searchInput);
    const searchterm=searchInput.value;
    console.log(searchterm); 
    const sortby=document.querySelector('input[name="sortby"]:checked').value;
    console.log(sortby);
    const searchLimit=document.getElementById("limit").value;
    console.log(searchLimit);
    // handle case when search input field is empty 
    if(searchterm===""){
        // alert danger is the css class to be applied to the alert element created
        showMessage("Please add a search Term","alert-danger")
    }

    //clear input after something has been searched for 
    
   searchInput.value="";
    reddit.search(searchterm,searchLimit,sortby)
    .then((searchresults)=>{
        console.log(searchresults);
        let output='<div class="card-columns">';
        searchresults.forEach((post)=>{
            let imageurl=post.preview?post.preview.images[0].source.url:
            "https://www.modernretail.co/wp-content/uploads/sites/5/2021/04/Reddit-Logo.jpeg"
            output+=`<div class="card">
            <img class="card-img-top" src="${imageurl}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncate(post.selftext,100)}</p>
              <a href="${post.url}"  target="_blank" class="btn btn-primary">Read More </a>
              <hr>
              <span class="badge badge-secondary"> Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark"> Score: ${post.score}</span>
            </div>
          </div>`;
        })

        output+='</div>'
        document.getElementById('results').innerHTML=output;
    })//.then(res=> console.log(res)); //*/
   // console.log(res);
    

    e.preventDefault();
});
function truncate(text,limit){
    const end=text.indexOf(" ",limit);
    if(end==-1) return text;
    return text.substring(0,end);
}

function showMessage(message,classname){
    //create a new element 
    const div= document.createElement('div');
    //apply required class
    div.className=`alert ${classname}`;
    // append another element Textnode and add message to it 
    div.append(document.createTextNode(message));
    // show this element before search area when search field is empty 
    const searchArea=document.getElementById("search");
    searchArea.before(div);
    // remove alert message div after 2s 
    setTimeout(() => div.remove(), 2000);

    //console.log(div);
}