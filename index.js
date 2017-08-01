var phantom = require('phantom');
const line = require('@line/bot-sdk');
const config = require('./config.json');
const Client = require('@line/bot-sdk').Client;

const client = new Client(config.config);



var phInstance = null;

var date = 20170803;
var url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0013&date="+date+"&screencodes=&screenratingcode=&regioncode=";
var isFinished = false;
phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'])
       .then(instance => {
        phInstance = instance;
        return instance.createPage();
        })
       .then(page => {
           
           var doing = setInterval(function(){
            page.open(url).then( status => {
              
                if(status){
                    
                    page.evaluate(function() {
                        return document.getElementsByClassName('sect-showtimes');
                    }).then(function(html){
                                
                        for(var i=0; i<html.length;i++){
                            if(html[i].textContent.search("덩케르크") != -1){
                                client.pushMessage(config.userId, {type: 'text', text: date+'의 덩케르트가 떴땅 \n 주소는 ' + url });
                                clearInterval(doing);
                                phInstance.exit();
                            }
                        }

                       
                    });
                }

            })
           }, 100000);
 
       })
