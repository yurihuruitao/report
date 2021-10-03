
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var xuli=1
    var dxuli=0.5
    var keyp = false
    var keyr = false
    var p=0
    var x=40
    var k=0
    var y=150
    var tablex=0
    var tablewidth=0
    var score=0

    function ran(){
      tablex=150+30*(Math.random()*10+1)
      tablewidth=10+5*(Math.random()*10)
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false); 
    function keyDownHandler(e) {
      if(e.keyCode == 32) {
        keyp = true;
        keyr = false
      }
    }
    function keyUpHandler(e) {
      if(e.keyCode == 32) {
        keyr = true 
        keyp = false
      }
    }
    function drawpower(){
        ctx.fillRect(40,150,p,5)
        ctx.fillStyle="#0095DD"
        if(keyp && p<100){
            xuli += dxuli
            p=xuli
        }
    }
    function drawbody(){
      ctx.fillStyle="red"
      ctx.beginPath();
      ctx.moveTo(50, 240);
      ctx.lineTo(60, 200);
      ctx.lineTo(70, 240);
      ctx.closePath();
      ctx.stroke();
      ctx.fill() 
    }

    function drawhead(){
      ctx.fillStyle="orange"
      ctx.beginPath()
      ctx.arc(60,200,10,0,2*Math.PI,)
      ctx.stroke()
      ctx.fill()
    }

    function jump(){
      if(keyr){
        ctx.clearRect(0,0,1000,1000);
        x=40+0.01*p*0.01*0.1*k*4*100
        y=150-0.5*k+0.0001*9.8*0.1*k*0.1*k*1/2*100
        ctx.fillRect(x,y,p,5)
        //body
        ctx.fillStyle="red"
        ctx.beginPath();
        ctx.moveTo(x+10, y+90);
        ctx.lineTo(x+20, y+50);
        ctx.lineTo(x+30, y+90);
        ctx.closePath();
        ctx.stroke();
        ctx.fill()
        //head
        ctx.fillStyle="orange"
        ctx.beginPath()
        ctx.arc(x+20,y+50,10,0,2*Math.PI,)
        ctx.stroke()
        ctx.fill()
        k=k+1
      }
    }
    function drawtable(){
      ctx.fillStyle="grey"
      ctx.fillRect(0,240,100,300);  
      ctx.fillRect(tablex,240,tablewidth,300)
    }

    function drawscore(){ctx.font = "36px serif";
      ctx.fillText("scores:"+score,0 , 36);
      
    }
    function detection(){
      if(y>150&&y<170&&x+20>tablex-20&&x+30<tablex+tablewidth+20){
        ctx.clearRect(0,0,1000,1000)
        xuli=1
        dxuli=0.5
        keyp = false
        keyr = false
        p=0
        x=40
        k=0
        y=150
        tablex=0
        tablewidth=0
        ran()
        drawtable()
        drawbody()
        drawpower()
        drawhead()
        score=score+1
      }
      if(y>320){
        alert("gameover"+" "+"score:"+score)
        xuli=1
        dxuli=0.5
        keyp = false
        keyr = false
        p=0
        x=40
        k=0
        y=150
        tablex=0
        tablewidth=0
        score=0
        document.location.reload(true)
      }
    }
    ran()
    function draw(){
      drawpower()
      drawbody()
      drawhead()
      jump()
      drawtable()
      drawscore()
      detection()
      window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw)
