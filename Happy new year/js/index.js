var defaults={};
defaults.init=function(){
	
	if($(window).width()<768){
		$("#home").css({
			"height":710,
		})
	}else{
		$("#home").css({
			"height":774,
		})
	}
	var h=$(document.body).height();
	$("#lightboxOverlay").css({
		"height":h,
		"z-index":10
	})	
	banner.init();
	banner.timer();
	this.events();
}
defaults.events=function(){
	//调整屏幕大小的时候，改变home的高度
	$(window).on("resize",function(){
		if($(window).width()<768){
			$("#home").css({
				"height":710,
			})
		}else{
			$("#home").css({
				"height":774,
			})
		}
	})
	//导航相关的事件
	banner.events();
	//service相关的事件
	service.events();
	//gallery部分相关的事件
	gallery.events();
	//prices部分相关的事件
	prices.events();
}
//banner区域
var banner={};
banner.isLog=false;
//导航栏操作
banner.init=function(){
	//当页面向下滚动的时候，导航的padding-top为0
	$(window).on("scroll",function(){		
		if($(this).scrollTop()>50){
			$("#home nav").css({
				"padding-top":0,
			})
			$("#home nav .navWrap").css({
				"background-color":"rgba(0,0,0,0.7)"
			})
		}else{
			$("#home nav").css({
				"padding-top":'1.5em'
			})
			$("#home nav .navWrap").css({
				"background-color":"rgba(0,0,0,0)"
			})
		}
	})	
}
banner.events=function(){
	//点击导航滑动到指定的内容区域
	var nav=$("#home .navWrap").find(".navItem");
	nav.each(function(index,item){
		$(this).on("click","a",function(ev){
			ev.preventDefault();
			var href=$(this).attr("href");
			var h=$(href).offset().top;
			var timer=null;	
			//执行动画前清除所有动画
			$('html, body').stop(true)
			$('html, body').animate({
				scrollTop: h,				
			},'easein').delay(1000);			
		})
	})
	//点击login，弹出登陆框
	$("#home .w3ls-navlog").on("click",".page-scroll",function(){
		nav.isLog=true;
		new Dialog({
			title:"",
			content:`<div class="Loginbody">
				<ul class="resp-tabs-list row">
					<li class="tabs-item active pull-left col-md-6">
						<a href="javascript:;">Login</a>
					</li>
					<li class="tabs-item pull-left col-md-6">
						<a href="javascript:;">register</a>
					</li>
					<div class="clearfix"></div>
				</ul>
				<div class="resp-tabs-container">
					<div class="tab-1">
						<div class="agileits-login form-group">
							<form action="#" method="post">
								<input type="email" name="email" placeholder="Email" class="form-control"/>
								<input type="password" name="password" placeholder="Password" class="form-control" />
								<div class="login-checkbox-line">
									<div class="pull-left">
										<label for="login-checkbox"></label>
										<input id="login-checkbox" type="checkbox" />
										Remember me?			
									</div>
									<div class="pull-right">
										<a href="javascript:;">Forgot password?</a>				
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="w3ls-submit">
									<input type="submit" value="Login" class="btn center-block text-uppercase"/>
								</div>
							</form>
						</div>
					</div>
					<div class="tab-1">
						<div class="agileits-login form-group">
							<form action="#" method="post">
								<input type="text" name="username" placeholder="Username" class="form-control"/>
								<input type="email" name="email" placeholder="Email" class="form-control" />
								<input type="password" name="password" placeholder="Password" class="form-control" />
								<div class="login-checkbox-line">
									<div class="pull-left">
										<label for="login-checkbox"></label>
										<input id="login-checkbox" type="checkbox" />
										 I accept the terms of use	
									</div>
									<div class="clearfix"></div>
								</div>
								<div class="w3ls-submit">
									<input type="submit" value="register" class="btn center-block text-uppercase"/>
								</div>
							</form>
						</div>
					</div>
				</div>				
			</div>`,
			width:600,
			left:"center",
			top:"center",
			okFn:function(){
				
			},
			closeFn:function(){
				nav.isLog=false;
			}
		})
		//给弹框添加点击事件
		$(".resp-tabs-list li").on("click",function(ev){			
			$(".full-pop .content .resp-tabs-list li").removeClass("active")
			$(this).addClass("active")
			$(".resp-tabs-container .tab-1").hide()
			var index=$(this).index()
			$(".resp-tabs-container .tab-1").eq(index).show()		
		})
	})
	//get your ticket区域
	$("#home .wthree-btn").on("mouseover",function(){
		var _this=$(this)
		$(this).find(".left").animate({
			"left":110
		},300,function(){
			_this.css({"background":"#bb3756"})
		})
		$(this).find(".right").animate({
			"right":110
		},300)
	})
	$("#home .wthree-btn").on("mouseout",function(){
		$(this).find(".left").css({"left":-20})
		$(this).find(".right").css({"right":-20})
		$(this).css({"background":"none"})
	})
	//welcome区域
	$(".welcome .glyphicon").on("mouseover",function(){
		$(this).animate({
			"transform":"scale(1.3)"
		},300)
	})		
}
//banner区域的时钟
banner.timer=function(){
	var t=tools.getTime()
	var str=tools.addZero(t.hours)+tools.addZero(t.minutes)+tools.addZero(t.second);
	var odd=$(".clock .column img:nth-of-type(1)")
	odd.each(function(index,item){
		$(item).attr("src","img/"+str.charAt(index)+".png")
	})
	setInterval(function(){
		var currentT=tools.getTime();
		var currentStr=tools.addZero(currentT.hours)+tools.addZero(currentT.minutes)+tools.addZero(currentT.second);
		var currentImg=$(".clock .column img:nth-of-type(2)");
		for (var i = 0; i < currentStr.length; i++) {
			if(currentStr.charAt(i)!==str.charAt(i)){
				currentImg.eq(i).attr("src","img/"+currentStr.charAt(i)+".png")
				;(function(i,currentImg){
					var obj=$(".clock .column>div").eq(i).get(0)
					MTween({
						el:obj,
						target:{
							top:-78
						},
						time:500,
						type:"linear",
						callBack:function(){
							obj.style.top='0'
							
							odd.eq(i).attr("src",currentImg.attr("src"))
							str=currentStr
						}
					})
				})(i,currentImg.eq(i))
			}			
		}
	},1000)
}
//service区域
var service={};

service.events=function(){
	$(".video-agileits .play-ico").on("click",function(){
		new Dialog({
			title:"",
			content:"",
			width:600,
			height:300,
			left:"center",
			top:$(window).scrollTop()+200,
			okFn:function(){				
			},
			closeFn:function(){
			}
		})		
	})
}
var staff={};
var gallery={};
gallery.events=function(){
	var index=null;
	var n=0;
	$("#gallery .gallery-grids").each(function(index,item){
	
		var _index=index;
		$(this).attr("indexNum",_index)
	})
	$("#gallery .glyphicon").on('click',function(){
		var _this=$(this)
		$(".gallery-mask").fadeIn();
		$(".lightbox").css({
			"top":$(window).scrollTop()+100
		})
		n=Number($(this).closest(".gallery-grids").attr("indexNum"))
		
		$(".lb-outerContainer img").attr("src","img/g"+(n+1)+".jpg")
		$(".lb-details").find("em:first-child").html((n+1))
	})
	//点击关闭按钮。隐藏弹出框
	$(".lb-closeContainer a").on("click",function(){
		$(".gallery-mask").fadeOut();
		
	})
	//轮播图部分，点击下一页	
	$(".lightbox .lightNext").on("click",function(){
		n++;
		n>=$(".gallery-grids").length-1?n=$(".gallery-grids").length-1:n=n;
		$(".lb-outerContainer img").attr("src","img/g"+(n+1)+".jpg")
	})
	//轮播图，点击上一页
	$(".lightbox .lightPre").on("click",function(){
		n--;
		n<=0?n=0:n=n;
		$(".lb-outerContainer img").attr("src","img/g"+(n+1)+".jpg")
	})
}
var prices={};
prices.events=function(){
	$(".pricesw3-agileits .pricing-bottom .btn").on("click",function(){
		new bookDialog()
	})
}
//数据对象
var data={};
//工具对象
var tools={};
tools.addZero=function(num){
	if(num>9){
		return ""+num;
	}else{
		return "0"+num;
	}
}
tools.getTime=function(){
	var t=new Date();
	var hour=t.getHours();
	var minutes=t.getMinutes();
	var seconds=t.getSeconds();
	return {
		hours:hour,
		minutes:minutes,
		second:seconds
	}
}
//book的弹窗
function bookDialog(options){
	this.diaDiv=null;
	options=options||{};
	//如果options不是一个对象，报错
	if(!(options instanceof Object)){
		throw new Error("函数参数必须为一个对象类型")
	}
	//设置一个默认的参数对象
	this.default={
		content:"这是默认的弹窗内容",
		width:null,
		height:null,
		left:"center",
		top:"center",
		okFn:function(){},
		resetFn:function(){},
		closeFn:function(){}		
	}
	//将传入的属性覆盖掉默认的default
	for(var attr in options){
		if(options.hasOwnProperty(attr)){
			this.default[attr]=options[attr]
		}
	}
	this.init();
}
bookDialog.prototype={
	init(){
		//显示遮罩
		document.body.appendChild(this.creatMaskHtml());
		//显示弹窗
		document.body.appendChild(this.creatPopHtml());	
		this.diaDiv.style.zIndex = 100;
	},
	//显示弹窗位置
	pos(){
		
	},
	size(){
		if(this.default.width==null){
			return
		}else{
			this.diaDiv.style.width=this.default.width+"px";
		}
		
		if(this.default.height==null){
			return
		}else{
			this.diaDiv.style.height=this.default.height+"px"	;
		}
	},
	creatMaskHtml(){
		this.mask=document.createElement("div");
		this.mask.className="mask";
		this.mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
		return this.mask;
	},
	creatPopHtml(){
		this.diaDiv=document.createElement("div")
		this.diaDiv.className="bookDialog";
		this.diaDiv.position="absolute";
		var diaHtml=`
				<div class="contentPop">
					<h4 class="text-left">
						Account Info
					</h4>
					<form action="#" method="post">
						<ul>
							<li class="pull-left">
								<input class="text" type="text" name="firstName" placeholder="First Name" />
							</li>
							<li class="pull-left">
								<input class="text" type="text" name="lastName" placeholder="Last Name" />
							</li>
							<div class="clearfix"></div>
						</ul>
						<ul>
							<li class="pull-left">
								<input class="text email" type="email" name="email" placeholder="Email" />
							</li>
							<li class="pull-left">
								<input class="text phoneNum" type="number" name="number" placeholder="Phone Number" />
							</li>
							<div class="clearfix"></div>
						</ul>
						<ul>
							<li class="pull-left select">
								<label>No of Tickets</label>
								<select class="text">
									<option value="1">1 ticket</option>
									<option value="2">2 tickets</option>
									<option value="3">3 tickets</option>
									<option value="4">4 tickets</option>
									<option value="5">5 tickets</option>
									<option value="6">more</option>
								</select>
							</li>
							<li class="pull-left select">
								<label>Package</label>
								<select class="text">
									<option value="1">Classic</option>
									<option value="2">Elite</option>
									<option value="3">Couple</option>
									<option value="4">Special</option>
									
								</select>
							</li>
							<div class="clearfix"></div>
						</ul>
						<ul class="address-row">
							<li>
								<input class="text address" type="text" placeholder="Address"/>
							</li>
						</ul>
					</form>
					<h4 class="text-left">
						Payment Method
					</h4>
					<ul class="payment-type">
						<li class="pull-left text-left">
							<input type="radio" id="payal" value="payal" name="payment-method"/>
							<a href="javascript:;" class="visa"></a>
						</li>
						<li class="pull-left text-left">
							<input type="radio" id="card" value="card" name="payment-method"/>
							<a href="javascript:;" class="card"></a>
						</li>
						<div class="clearfix"></div>
					</ul>
					<ul>
						<li class="pull-left">
							<input type="text" class="text" placeholder="Card Name" />
						</li>
						<li class="pull-left">
							<input type="text" class="text" placeholder="Name on card" />
						</li>
						<div class="clearfix"></div>
					</ul>
					<ul>
						<li class="pull-left">
							<input type="text" class="text" placeholder="Expiration Date" />
						</li>
						<li class="pull-left">
							<input type="text" class="text" placeholder="Security Code" />
						</li>
						<div class="clearfix"></div>
					</ul>
					<ul class="btn-row">						
						<li class="pull-right">
							<input class="process" type="button" value="Process order" />
						</li>
						<li class="pull-right">
							<input class="reset" type="button" value="Reset" />
						</li>
						<div class="clearfix"></div>
					</ul>
				</div>
				<a href="javascript:;" class="closeBtn">
					<span>&times;</span>
				</a>
				`;
		this.diaDiv.innerHTML = diaHtml;
		this.ok=$(this.diaDiv).find(".process");
		this.resets=$(this.diaDiv).find(".reset");
		this.close=$(this.diaDiv).find(".closeBtn");
		return  this.diaDiv;
	}
	
}


$(document).ready(function(){
	defaults.init()
})

