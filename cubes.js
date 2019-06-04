let points=[];
let i,j,k;
let x,y,z;
let n=5;
let size=80;
let level;
let angle=0;
let out;
let a;
let slider;


let act=[];
function setup(){
 slider = createSlider(0,1000,150,10);
 slider.position(50,200)

  createCanvas(800,800,WEBGL);
  a=createSlider(0,255,200,1);
  a.position(50,100)
  for(i=0;i<n;i++){
    points[i]=[];
    for(j=0;j<n;j++){
      points[i][j]=[];
    }
  }


  for(i=0;i<n;i++){
    for(j=0;j<n;j++){
      for(k=0;k<n;k++){
        let offset=random(-10,10);
        let b= map(offset,-10,10,0,255);
        points[i][j][k]=new block(b+noise(offset)*10,size*i,size*j,size*k);
      }
    }
  }
 out=new cover(size*(n-1),size*(n-1)/2,size*(n-1)/2,size*(n-1)/2)

}


function draw(){
  background(50);



  translate(-240,-200,-80);
  rotateX(radians(-34.9));
  rotateY(radians(51.9));
  translate(120,100,120);
  stroke(255);
  rotateY(radians(angle));
  translate(-120,-100,-120)

  level=a.value();

  out.show()

  for(x=0;x<n;x++){
    for(y=0;y<n;y++){
      for(z=0;z<n;z++){

        if(points[x][y][z].va>level){
          points[x][y][z].show()
        }
      }
    }
  }


  //testing set
  // i=2;
  // k=0;
  // j=0;
  // points[i+0][j+0][k+0].show() //7
  // points[i+1][j+0][k+1].show() //5
  // points[i+0][j+0][k+1].show() //6
  // points[i+1][j+0][k+0].show() //4
  // points[i+0][j+1][k+0].show() //3
  // points[i+0][j+1][k+1].show() //2
  // points[i+1][j+1][k+1].show() //1
  // points[i+1][j+1][k+0].show() //0


  for(x=0;x<n-1;x++){
    for(y=0;y<n-1;y++){
      for(z=0;z<n-1;z++){
        let cube=[]
        cube=[points[x+0][y+0][z+0],
                points[x+0][y+0][z+1],
                points[x+1][y+0][z+1],
                points[x+1][y+0][z+0],
                points[x+0][y+1][z+0],
                points[x+0][y+1][z+1],
                points[x+1][y+1][z+1],
                points[x+1][y+1][z+0]];

        terrain(cube,level);
      }
    }
  }

  angle+=1;
}

class cover{
  constructor(size,x,y,z){
    this.size=size;
    this.x=x;
    this.y=y;
    this.z=z;
  }
  show(){
    push();
    stroke(255,80);
    noFill()
    translate(this.x,this.y,this.z);
    box(this.size);
    pop();
  }
}


class block{
  constructor(val,x,y,z){
    this.va=val;
    this.x=x;
    this.y=y;
    this.z=z;
  }

  show(){
    push();
    translate(this.x,this.y,this.z);
    stroke(this.va);
    strokeWeight(10);
    point(0,0,0);
    pop();
  }

  mid(a){
    return([abs((this.x+a.x))/2,abs((this.y+a.y))/2,abs((this.z+a.z))/2]);
  }

  vara(){
    return(this.va)
  }
}



function terrain(ab,sea){

  let activation=[0,0,0,0,0,0,0,0];
  let connect=[];
  let edges=[ab[7].mid(ab[6]),
  ab[6].mid(ab[5]),
  ab[5].mid(ab[4]),
  ab[4].mid(ab[7]),
  ab[3].mid(ab[2]),
  ab[2].mid(ab[1]),
  ab[1].mid(ab[0]),
  ab[0].mid(ab[3]),
  ab[7].mid(ab[3]),
  ab[6].mid(ab[2]),
  ab[5].mid(ab[1]),
  ab[4].mid(ab[0])]

  for(let x=0;x<8;x++){
    if(ab[x].va>sea){
      activation[x]=1;
    }
  }

  let num=bin_dec(activation);
  let trig=clean(tri[num]);

  let tris=(trig.length)/3;

  for(let k=0;k<tris;k++){
    connect.push(trig.slice(k*3,(k+1)*3));
  }
  push();
  beginShape();
  fill(0,255,0,slider.value())
  // stroke(255,90)
  noStroke()
  for(i in connect){
    vertex(edges[connect[i][0]][0],edges[connect[i][0]][1],edges[connect[i][0]][2]);
    vertex(edges[connect[i][1]][0],edges[connect[i][1]][1],edges[connect[i][1]][2]);
    vertex(edges[connect[i][2]][0],edges[connect[i][2]][1],edges[connect[i][2]][2]);
  }
  endShape();
  pop();

ab=[]

}


function bin_dec(a){
  sum=0;
  for(let i=0;i<a.length;i++){
    sum+=(pow(2,a.length-1-i))*a[i];
  }
  return(sum);
}

function clean(a){
  b=[]
  for(let i=0;i<a.length;i++){
    if(a[i]!==-1){
      b.push(a[i]);
    }
  }
  return(b);
}
