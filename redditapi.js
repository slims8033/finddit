export default {
    search:function(searchterm,searchLimit,sortby){
        return fetch(`https://www.reddit.com/search.json?q=${searchterm}
        &sort=${sortby}&limit=${searchLimit}`)
        .then(res=>res.json())
        .then(data=>data.data.children.map(ele=>ele.data));
        

        //console.log(fetchresponse);
    }
};

//export default executeSearch;