var q = ScreenShow.find({}).sort();
q.exec(function(err, screenshows) {
    var arr = []
    screenshows.forEach((i, g) =>{
        // console.log("my DATTAAAAAaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAA",i.Image.data.toString('base64'))
        let o={...i}
        o["img"]=i.Image.data.toString('base64')
        o["cnt"]=i.Image.contentType
        arr.push(o);
        if (g+1===screenshows.length){
            console.log(arr)
            res.render('home', { ScreenShowData: JSON.stringify(arr) });
        }
    })
    // res.render('home', { ScreenShowData: JSON.stringify(screenshows) });
});


<img src="data:<%= ScreenShowsData[i].cnt%>;base64,<%=ScreenShowsData[i].img%>">