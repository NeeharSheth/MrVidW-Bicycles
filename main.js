video="";
status= false;
r= 0;
b= 0;
g= 0;
objects=[];

function preload(){
video= createVideo("video.mp4");
video.hide();
}

function setup(){
    canvas=createCanvas(300,300);
    canvas.position(550,470);
}

function draw(){
    image(video,0,0,300,300);
    if(status == "true"){
        objectDetector.detect(video, gotResults);

        r=random(255);
        g=random(255);
        b=random(255);

        for(i=0;i<objects.length;i++){
            document.getElementById("button_status").innerHTML="Detected Objects";
            fill(r,g,b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+20,objects[i].y+20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            document.getElementById("button_objects").innerHTML="Number of objects: "+objects.length;
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("other_btn").style.visibility="visible";
    document.getElementById("button_status").innerHTML="Detecting Objects";
    console.log(document.getElementById("method_select").value);
}

function modelLoaded(){
    console.log("model loaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    objects= results;
}
}