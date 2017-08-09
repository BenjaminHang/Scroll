(function($){
		function Scroll(options){
			this._init(options)
			this._initVar()
			this._initSliderDragEvent()
			this._bindMouseWheel()
		}
		Scroll.prototype = {
			_init : function(options){
				var scroll = this
				scroll.options = {
					s_dir : 'y',//滚动方向
					s_content : '',
					s_bar : '',
					s_slider : '',
					w_speed : 10,
				}
				$.extend(true, scroll.options,options||{})	
			},
			_initVar : function(){
				this.content = $(this.options.s_content)
				this.bar = $(this.options.s_bar)
				this.slider = $(this.options.s_slider)
			},
			_initSliderDragEvent : function(){
				var scroll = this
				var slider = this.slider
				if(slider[0]){
					slider.on('mousedown', function(e){
						var mouse_positionY = e.pageY					
						var content_positionY = scroll.content[0].scrollTop
						var rate = scroll.Getcontentmovedistance()/scroll.Getslidermovedistance()
						$(document).on('mousemove.scroll',function(e){
							if(mouse_positionY){
								scroll.Bindslidertocont((e.pageY-mouse_positionY)*rate+content_positionY)
							}
						}).on('mouseup.scroll',function(e){
							$(document).off('.scroll')
						})
					})
				}
			},
			_bindMouseWheel : function(){
				var scroll = this
				this.content.on('mousewheel DOMMouseScroll',function(e){
					var oEv = e.originalEvent
					//console.log(oEv)
					var wRange = oEv.wheelDelta ? -oEv.wheelDelta/120 : (oEv.detail || 0)/3
					scroll.Bindslidertocont(scroll.content[0].scrollTop+wRange*scroll.options.w_speed)
				})
			},
			Getcontentmovedistance : function(){
				return Math.max(this.content.height(),this.content[0].scrollHeight)-this.content.height()
			},
			Getslidermovedistance : function(){
				return this.bar.height()-this.slider.height()
			},
			Getsliderposition : function(){
				var rate = this.Getcontentmovedistance()/this.Getslidermovedistance()
				return rate != 0 ? this.content[0].scrollTop/rate : 0
			},
			Bindslidertocont : function (position) {
				this.content.scrollTop(position)
				this.slider[0].style.top = this.Getsliderposition() + 'px'
			}
		}
		window.Scroll = Scroll
	})(jQuery)