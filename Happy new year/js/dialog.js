function Dialog(option){
	this.diaDiv=null;
	
	//如果没有传入对象，option等于一个空的对象
	option=option||{};
	//＊＊当用option instanceof Object做判断的时候，需要用括号包起来
	if(!(option instanceof Object)){//当前的参数不是一个对象要报错
		throw new Error("函数参数必须为一个对象类型");//报错就不会再往下执行了
	}
	//设置一个默认的参数对象
	this.default={
		title:"标题",
		content:"这是默认的弹窗内容",
		width:null,
		height:null,
		left:"center",
		top:"center",
		okFn:function(){},
		closeFn:function(){}
	}
	//将传入的属性覆盖掉默认的default.
	for(var attr in option){
		if(option.hasOwnProperty(attr)){
			this.default[attr]=option[attr]
		}
	}
	
	this.init();
	this.rePos();
	
	//让弹窗具有拖拽功能，拖拽调用的时候，一定要用new 来调用
	//当一个组件需要具有某些功能的时候，在这个组件的构造函数中调用
//	new Drag({
//		targetEle:this.head,
//		moveEle:this.diaDiv
//	})
}

Dialog.prototype={
	//init里面是表示此组件最基本的功能。
	init(){
		//显示弹窗
		document.body.appendChild(this.creatPopHtml());					
		this.diaDiv.style.zIndex = 100;
		//显示遮罩
		document.body.appendChild(this.creatMaskHtml());
		this.mask.style.ZIndex=99;
		//调用弹窗位置函数
		this.size();
		this.pos();		
		//调用事件的函数
		this.okFn();
		this.closeFn()
	},
	//显示弹窗位置
	pos(){
		//如果传入的left Top 是center,那么表示在页面中是居中的位置，默认是居中的状态
		//如果传入left top，则按照输入内容显示
		if(this.default.left==="center"){
			//($(window).width()-this.diaDiv.offsetWidth)/2+"px"
			this.diaDiv.style.left="50%";
			this.diaDiv.style["margin-left"]=-($(this.diaDiv).width()/2)+"px";
		}else{
			this.diaDiv.style.left=this.default.left+"px";
		}
		if(this.default.top==="center"){
			this.diaDiv.style.top=($(window).height()-this.diaDiv.offsetHeight)/2+"px"
		}else{
			this.diaDiv.style.top=this.default.top+"px";
		}
	},
	//调整窗口大小的时候，弹框位置改变
	rePos(){
		var _this=this;
		window.addEventListener("resize",function(){
			_this.pos();
		})
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
	//生成弹框的结构
	creatPopHtml(){
		this.diaDiv = document.createElement("div");
		this.diaDiv.className = "full-pop";
		this.diaDiv.position="absolute"
		var diaHtml = `<h3>
			<p class="title">${this.default.title}</p>
			<a href="javascript:void(0);" class="close" title="关闭">&times;</a>
			</h3>
			<div class="content">
			${this.default.content}
			</div>
			<div class="pop-btns">
				<span class="error"></span>
				<a href="javascript:void(0)" class="confirm">确定</a>
				<a href="javascript:void(0)" class="cancel">取消</a>
			</div>`;
		this.diaDiv.innerHTML = diaHtml;
		this.head=this.diaDiv.querySelector("h3");
		this.ok=this.diaDiv.querySelector(".confirm");
		this.cancel=this.diaDiv.querySelector(".cancel");
		this.close=this.diaDiv.querySelector(".close");
		return this.diaDiv;
	},
	//遮罩的结构
	creatMaskHtml(){
		this.mask=document.createElement("div");
		this.mask.className="mask";
		this.mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
		return this.mask;
	},
	//以下为弹窗事件
	//当点击确定的时候
	okFn(){
		var _this=this;
		this.ok.addEventListener("click",function(){
			var bl=_this.default.okFn();
			//当bl为undefinded 或者是 false的时候，表示可以继续执行，如果传入的是true,表示不能继续执行
			if(!bl){//当是false的时候
				_this.closeDialog();
			}
		})
	},				
	//当点击关闭和取消的时候
	closeFn(){
		var _this=this;
		this.cancel.addEventListener('click',function(){
			_this.closeDialog();
		})
		this.close.addEventListener("click",function(){
			_this.closeDialog();
		})
	},
	//移出弹窗和遮罩
	closeDialog(){
		document.body.removeChild(this.diaDiv);
		document.body.removeChild(this.mask);
	}
}