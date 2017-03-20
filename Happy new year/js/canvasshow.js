;(function(){
	var canvas=$("#canvas").get(0);
    var ctx = canvas.getContext("2d"),
        cw = window.innerWidth,
        ch = window.innerHeight,
        fireworks = [], //烟花数组
        particles = [], //烟花爆炸屑数字
        hue = 120, //初始色调 0/360 红色 120 绿色 240 蓝色
        timerTotal = 80, //每隔80下释放一次烟花
        timerTick = 0;
	//设置canvas画布的宽高
	canvas.width = cw;
	canvas.height = ch;
	
	//生成min到max之间的随机数
	function random(min,max){
	        return Math.random()*(max-min)+min;
	}
	
	//计算点(sx,sy)到点(tx,ty)之间的距离
	function caculateDistance(sx,sy,tx,ty){
	        var xDistance = sx-tx,
	            yDistance = sy-ty;
	            //xDistance的平方+yDistance的平方再开方
	        return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
	}
	
	//烟花对象 (sx,sy)初始位置 (tx,ty)目标位置
	function Firework(sx,sy,tx,ty){
	        this.x = sx; //实时运行坐标x
	        this.y = sy; //实时运行坐标y
	        console.log(this.x,this.y)
	        this.sx = sx; //初始位置坐标x
	        this.sy = sy; //初始位置坐标Y
	        this.tx= tx; //目标位置坐标x
	        this.ty = ty; //目标位置坐标Y
	        //计算初始位置到目标位置之间的距离
	        this.distanceToTarget = caculateDistance(sx,sy,tx,ty); 
	        this.distanceTraveled = 0; //已运行距离
	        this.coordinates = []; //是一个辅助变量 用于生成实时运动轨迹
	        this.coordinatesCount = 1;
	        while(this.coordinatesCount--){
	                this.coordinates.push([this.x,this.y]);
	        }
	        this.angle = Math.atan2(ty-sy,tx-sx); //初始位置和目标位置之间的角度
	        this.speed = 2; //初始速度
	        this.acceleration = 1.05 //加速度
	        this.brightness = random(50,70); //亮度
//		        this.targetRadius = 1; //目标位置标示圆圈的初始半径
	}
	
	//更新烟花的位置
	Firework.prototype.update = function(index){
	        this.coordinates.pop();
	        this.coordinates.unshift([this.x,this.y]);
	        console.log(this.coordinates)
	        //上面是一个技巧吧 先将数组最后一个移除，然后将当前烟花位置插入到第一个，那数组最后一个元素和更新之后的坐标之间就形成了一条轨迹
	        //让目标标示处圆圈动起来
//		        if(this.targetRadius<20) {
//		                this.targetRadius += 2;
//		        } else {
//		                this.targetRadius = 1;
//		        }
	        this.speed *= this.acceleration; //根据加速度变换速度
	        var vx = Math.cos(this.angle)*this.speed,//计算水瓶方向速度
	            vy = Math.sin(this.angle)*this.speed; //计算垂直方向速度
	        this.distanceTraveled = caculateDistance(this.sx,this.sy,this.x+vx,this.y+vy); //重新计算烟花已运行距离
	        //如果烟花运行距离大于或等于初始位置到目标位置之间的距离，生成新烟花并移除当前烟花，否则更新烟花位置
	        if(this.distanceTraveled>=this.distanceToTarget){
	                createParticles(this.tx,this.ty);
	                fireworks.splice(index,1);
	        }else{
	                this.x += vx;
	                this.y += vy;
	        }
	}
	
	//画出烟花运行轨迹
	Firework.prototype.draw = function(){
	        ctx.beginPath();
	        ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]);
	        ctx.lineTo(this.x,this.y);
	        ctx.strokeStyle = 'hsl('+hue+',100%,'+this.brightness+'%)';
	        ctx.stroke();
	
	        //画出目标位置标示小圆圈
	        ctx.beginPath();
	        ctx.arc(this.tx,this.ty,this.targetRadius,0,Math.PI*2);
	        ctx.stroke();
	}
	
	//烟花爆炸屑对象
	function Particle(x,y){
	        this.x = x;
	        this.y = y;
	        this.coordinates = [];
	        this.coordinatesCount = 5;
	        while(this.coordinatesCount--){
	                this.coordinates.push([this.x,this.y]);
	        }
	        this.angle = random(0,2*Math.PI); //生成任意方向的碎屑
	        this.speed = random(1,10); //随机速度
	        this.friction = 0.95 //摩擦力
	        this.gravity = 1; //重力
	        this.hue = random(hue-20,hue+20); //生成与烟花色彩相近的碎屑
	        this.brightness = random(50,80); //随机明度
	        this.alpha = 1; //初始透明度
	        this.decay = random(0.015,0.03); //碎屑消失时间
	}
	
	Particle.prototype.update = function(index){
	        this.coordinates.pop(); 
	        this.coordinates.unshift([this.x,this.y]);
	        //上面是一个技巧吧 先将数组最后一个移除，然后将当前烟花位置插入到第一个，那数组最后一个元素和更新之后的坐标之间就形成了一条轨迹
	        this.speed *= this.friction;
	        this.x += Math.cos(this.angle) * this.speed;
	        this.y += Math.sin(this.angle) * this.speed + this.gravity;
	        this.alpha -= this.decay;
	        if(this.alpha<=this.decay){
	                particles.splice(index,1);
	        }
	}
	
	Particle.prototype.draw = function(){
	        ctx.beginPath();
	        ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]);
	        ctx.lineTo(this.x,this.y);
	        ctx.strokeStyle = 'hsla('+this.hue+',100%,'+this.brightness+'%,'+this.alpha+')';
	        ctx.stroke();
	}
	
	function createParticles(x,y){
	        //生成30个烟花碎屑
	        var particleCount = 100;
	        while(particleCount--) {
	                particles.push(new Particle(x,y));
	        }
	}
	
	function loop(){
	        //流畅动画过程
	        requestAnimationFrame(loop);
	        hue += 0.5;
	        ctx.globalCompositeOperation = 'destination-out';//在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
	        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	        ctx.fillRect( 0, 0, cw, ch );	
	        ctx.globalCompositeOperation = 'lighter';//显示源图像 + 目标图像。
	        var i = fireworks.length;
	        while(i--) {
	                fireworks[i].draw();
	                fireworks[i].update(i);
	        }
	        var i = particles.length;
	        while(i--) {
	                particles[i].draw();
	                particles[i].update(i);
	        }
	        if(timerTick >= timerTotal) {
	                fireworks.push(new Firework(cw/2,ch,random(0,cw),random(0,ch/2)));
	                timerTick = 0;
	        } else {
	                timerTick++;
	        }
	        
		}
	window.onload = loop;
})()