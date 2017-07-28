var phantom = require('phantom');
const line = require('@line/bot-sdk');
const config = require('./config.json');
const Client = require('@line/bot-sdk').Client;

const client = new Client(config.config);



var phInstance = null;

var date = 20170731;
var url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0013&date="+date+"&screencodes=&screenratingcode=&regioncode=";
phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'])
       .then(instance => {
        phInstance = instance;
        return instance.createPage();
        })
       .then(page => {
           console.log("하이");
               
           page.open(url).then( status => {
            console.log("결과"+status);
            if(status){
                
                page.evaluate(function() {
                    return document.getElementsByClassName('sect-showtimes');
                }).then(function(html){
                    console.log("개수"+html.length);
                    
                    for(var i=0; i<html.length;i++){
                        if(html[i].textContent.search("덩케르크") != -1){
                            console.log("있당");
                            //TODO line messaging
                            client.pushMessage(config.userId, {type: 'text', text: date+'의 덩케르트가 떴땅 \n 주소는 ' + url });
                        }else{
                            console.log("없당");
                            
                        }
                    }

                    phInstance.exit();
                });
            }
           })
          
       })
