/**
 * Created by lbx on 2018/10/16.
 */

      $(function(){
        //   控制左侧导航
        
        $('.nav').find('dt').click(function(){
            var self = $(this)
            var appid = self.find('span').data("show"); 
        if(appid==true){
            self.find('span').removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom");
            self.find('span').data("show",false);
            self.siblings("dd").hide(300)
        }else{
            self.find('span').removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top");
            self.find('span').data("show",true); 
            self.siblings("dd").show(300) 
        }
          
        }) 
        //图片头像裁剪
        var options =
        {
            thumbBox: '.thumbBox',
            spinner: '.spinner',
            imgSrc: '../images/avatar.png'
        }
        var cropper = $('.imageBox').cropbox(options);
        $('#upload-file').on('change', function(){
            var reader = new FileReader();
            reader.onload = function(e) {
                options.imgSrc = e.target.result;
                cropper = $('.imageBox').cropbox(options);
            }
            reader.readAsDataURL(this.files[0]);
            this.files = [];
        })
        var messages = '';
        $('#btnCrop').on('click', function(){
            var img = cropper.getDataURL();//需要上传的裁剪的图片
            messages = img;
            $('.cropped').html('');
      
            $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
            $('.cropped').append('<button type="button" class="btn padding btn-primary">上传该头像</button>')
            $('.cropped').append('<button type="button" class="btn qx padding3 btn-primary">取消上传头像</button>')
        })
        $('#btnZoomIn').on('click', function(){
            cropper.zoomIn();
        })
        $('#btnZoomOut').on('click', function(){
            cropper.zoomOut();
        })
        $('#img').on('click', function(){
           $('.jt1').show(200)
        })
        $(document).on('click','.qx', function(){
           $('.jt1').hide(200)
        })
        $(document).on('click','.padding', function(){
          $('#img').attr("src",messages);
           $('.jt1').hide(200)
        })

        
        //开关
         
        $('[name="status"]').bootstrapSwitch({
                onText:"公开",
                offText:"保密",
                // onColor:"success",
                // offColor:"info",
                size:"small",
                onSwitchChange:function(event,state){
                    console.log(state)
                    if(state==true){
                       // $(this).val("1");
                       $(this).data('show','1')
                    }else{
                      //  $(this).val("2");
                      $(this).data('show','0')
                    }
                }
            })
            $('[name="status"]').each(function(){
               var pd = $(this).data('show');
               if(pd==0){
                $(this).bootstrapSwitch('state', false);  
               }else{
                $(this).bootstrapSwitch('state', true);  
               }
            })

        //全职兼职切换
         $('.switch').find('a').click(function(){
           var self = $(this);
           var appid = self.data("show"); 
           if(appid==true){
            self.removeClass("active").siblings().addClass("active");
            self.data("show",false).siblings.data("show",true);
         
        }else{
            self.addClass("active").siblings().removeClass("active");
            self.data("show",true).siblings.data("show",false); 
            
        }
         })

         //控制显示简历公开隐藏介绍
        $('.state').popover({
            trigger:'hover',
            title:"简历情况说明",
            content: '公开：允许所有通过建筑猎聘网站认证审核的企业查看的简历;保密：不允许任何人员或企业查看你的简历'
         
           })

           //倒计时
           var countdown=60; 
            $('.hqyzm').click(function(){
                var obj = $(this);
                settime(obj);
            })
            function settime(obj) { //发送验证码倒计时
                if (countdown == 0) { 
                    obj.attr('disabled',false); 
                    //obj.removeattr("disabled"); 
                    obj.val("获取验证码");
                    countdown = 60; 
                    return;
                } else { 
                    obj.attr('disabled',true);
                    obj.val("重新发送(" + countdown + ")");
                    countdown--; 
                } 
            setTimeout(function() { 
                settime(obj) }
                ,1000) 
            }

           //nav 点击事件
           $('.nav a').click(function(){
              $('.nav').find('a').removeClass('active');
              $(this).addClass('active')
           })

           //修改手机及邮箱
            var phone = $('#pho');
            var email = $('#email');
            phone.click(function(){
                $('.jt2').show(200)
            })
            email.click(function(){
                useEmail(true)
                $('.jt3').show(200)
             
            })
            $('#qx').click(function(){
               
                $('.jt2,.jt3').hide(200)
                setTimeout(function(){
                    useEmail(false)
                },500)
               
            })
            //第一个输入框
               var input1 =$('.phones')//手机
            //第二个输入框
               var input2 =$('.yzm')//验证码
     
            $('#wc').click(function(){
                var that = $(this);
                var self = $(this).data('type')
                    var m1 = input1.val();
                    var m2 = input2.val();
                    //当弹出框为修改手机号码
                    if(self=='phone'){
                   
                    if(m1=='' || m2==''){
                        bigerHint(that,'bottom','您填写信息有误！',800)
                        bigestHint("温馨提示！","您有未填项","info")
                    }else if(!isPoneAvailable(input1)){
                        smallHint(input1,'bottom','手机号码格式不正确',1000)
                    }else if(m1==$('.thatPho').html()){
                        smallHint(input1,'bottom','请输入您新的手机号',1000)
                        bigestHint("警告！","不能输入旧的手机号码来修改手机号。","danger")
                    }else if(m2!=888888){
                        smallHint(input2,'bottom','验证码不正确！',1000)
                    }else{
                        $('.jt2').hide(200)  ;
                        bigestHint("成功!","您的手机号已经修改为"+m1+"。","success",3000);
                        input2.val(m1);
                        $('.thatPho').html(m1);
                        var m2 = input2.val('');
                    }
                }else{
                    //当弹出框为修改email
                    var Einput1 = $('.jt3').find('.phone');
                    var Einput2 = $('.jt3').find('.yzm');
                    var e1 = Einput1.val();
                    var e2 = Einput2.val();
                    console.log(e1,e2)

                     if(!checkEmail(e1)){
                        smallHint(Einput1,'bottom','邮箱码格式不正确',1000)
                     }else if(e2==' ' ){
                        smallHint(Einput2,'bottom','验证码不能为空',1000)
                     }
                     else if(e2!='888888'){
                        smallHint(Einput2,'bottom','验证码不正确',1000)

                     }else{
                        bigestHint("成功!","您的手机号已经修改为"+e1+"。","success",3000); 
                        $('.thatEma').html(e1);
                        $('.jt3').hide(200)
                        setTimeout(function(){
                            useEmail(false)
                        },500)
                            }
                }
            })
            //刷新
             $(document).on( 'click','.refresh,.apply,.collect',function(){
                
                 var pf = $(this).attr('class');
                 
                 switch(pf)
                    {
                    case 'refresh':
                    bigestHint("成功!","您简历刷新成功。","success",2200)
                    break;
                    case 'apply':
                    bigestHint("警告!","您网络好像出现问题。","warning",2200)
                    break;
                    default:
                    bigestHint("失败!","您简历收藏失败！","danger",2200)
                    }
                
                   
                // 
            });
            // 简历中心-全职兼职切换
             $('.second.jiCenter a').click(function(){
               $('.second.jiCenter a').addClass('active');
               $(this).removeClass('active');
                //  $(this).index()
             })

            //组件区
            function smallHint (sele,place,count,time){//小提示卡
                sele.tooltip({
                    title: count,
                    placement: place,
                    delay: 400
                    });
                    sele.tooltip('show');
                    if(time){
                        setTimeout(function(){
                        sele.tooltip('destroy');
                      },time)
                    }else{
                        setTimeout(function(){
                        sele.tooltip('destroy');
                       },2000)
                    }
                   
                }

            function bigerHint(sele,place,count,time){//中提示卡
                sele.popover({
                        placement:place	,
                        content: count
                    })
                    sele.popover('show')//展示
                    
                    if(time){
                        setTimeout(function(){
                            sele.popover('destroy')//销毁
                      },time)
                    }else{
                        setTimeout(function(){
                            sele.popover('destroy')//销毁
                       },2000)
                    }
            }

            function bigestHint(title,count,style,time){//大提示卡
             //info、danger、warning、success ——给警告框设置情景效果
              var mes = $('   <div class="alert pBalert alert-'+style+' fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>'+title+'</strong>'+count+'</div>');
              $("body").prepend(mes);
              if(time){
                    setTimeout(function(){
                        $(".pBalert").remove();
                      },time)
                    }else{
                        setTimeout(function(){
                            $(".pBalert").remove();
                    },2800)
                }

            }

            //手机格式是否正确           
            function isPoneAvailable($poneInput) {
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test($poneInput.val())) {
                    return false;
                } else {
                    return true;
                }
           }
            
            //邮箱是否正确
            function checkEmail(str){
                var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
            　  //console.log(str);
            　　if(str === ""){ //输入不能为空
            　　　　//alert("输入不能为空!");
            　　　　return false;
            　　}else if(!reg.test(str)){ //正则验证不通过，格式不对
            　　　　//alert("验证不通过!");
            　　　　return false;
            　　}else{
            　　　　//alert("通过！");
            　　　　return true;
            　　}
            }
             //对修改手机号改造为修改邮箱
             function useEmail(self){
                var parent = $('.jt2');
                var copy = parent.clone(true);
                 if(self){//新建
                copy.removeClass('jt2').addClass('jt3'); 
                copy.find('h3').html("修改绑定邮箱");
                 //   parent.find('h4,h5').css("visibility","hidden");
                 copy.find('h4').html('修改绑定邮箱须先短信验证');
                 copy.find('h5').html('<em>请使用：</em><span class="thatPho">'+$('.thatPho').html()+' 接收验证码</span>');
                 copy.find('section').eq(0).find('span').html('<em>*</em>新的邮箱');
                 copy.find('section').eq(0).find('input').attr('placeholder',"请输入邮箱");
                 copy.find('section').eq(0).find('input').val(" ");
                 copy.find('section').eq(1).find('input').eq(0).val(" ");
                 copy.find('#wc').data('type','email');
                 copy.find('#wc').attr('id','Ewc');
                 copy.find('#qx').attr('id','Eqx');
                 $('body').prepend(copy)
                //  console.log(copy)
                
               
                 }else{//销毁

                  $('.jt3').remove();
                 }

             }
      
             //对
      })

