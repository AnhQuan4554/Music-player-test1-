const heading = document.querySelector('header h2');
const cd_thumb =  document.querySelector('.cd-thumb');
const audio =  document.querySelector('#audio');
const  btn_toggle_play = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');
const progress = document.querySelector('#progress');
const music_random = document.querySelector('.btn-random');
const repeat_song = document.querySelector(".btn-repeat");
const playlist = document.querySelector('.playlist')//duungf như này thì khi bấm vào e( từng cái con của nó sẽ dễ hơn )
/* rút kinh nghiệm là ở chỗ phát nhạc nên đạt biến ban đầu là false nếu bấm thì nahcj sẽ thành true */

/* console.log(Math.floor(Math.random()*8)) */
/* rút kinh nghiệm cho lần sau là tất cả chức năng quay đĩa hay 
cái nút bắt đầu tạm dừng bài hát chuyển cho nhau đưa hết vào khi 
audio.play  */
const app = {
    
    currentIndex_song :  0,
    songs : [
        {
            name : 'Unsop ter',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Unstoppable - Sia (Lyrics + Vietsub) ♫.mp3'
        },
        {
            name : 'Unsop 2',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/mệt mỏi lấy nươucs.mp3'
        },
        {
            name : 'Unsop 3',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Unstoppable - Sia (Lyrics + Vietsub) ♫.mp3'
        },
        {
            name : 'Unsop 4',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Penta kill teemo lol Wild Rift.mp3'
        },
        {
            name : 'Unsop 5',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Sad Emotional Piano Music - Gaming Background Music (HD).mp3'
        },
        {
            name : 'Unsop 6',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Unstoppable - Sia (Lyrics + Vietsub) ♫.mp3'
        },
        {
            name : 'Unsop 7',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Wii Music - Gaming Background Music (HD).mp3'
        },
        {
            name : 'Unsop 8',
            singer : 'Nguyễn Anh Quân ',
            image : './img/pro 3.jpg',
            path : './music/Unstoppable - Sia (Lyrics + Vietsub) ♫.mp3'
        },
    ],
    render : function(){
        const html = this.songs.map((song,index) =>{ //index để lấy ra bài hát 
            return `
            
            <div class="song ${index === this.currentIndex_song ? 'active': ''}" index-song = ${index}>
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
          </div>

            `
        })
        document.querySelector('.playlist')
        .innerHTML = html.join("");
    },

      
    //lấy ra bài hát đầu tiên ( nhưng tí sẽ cho cái biến currenIndex_song tăng lên sẽ đc các bài hát tiếp )
    getCurrentIndex_song : function(){
        return this.songs[this.currentIndex_song];
    },
    /* sử lí tất cả các lệnh  */
    handelEvents: function(){
        const _this = this;

        const widthCD = document.querySelector('.cd').offsetWidth;//chiều rộng cd
        document.onscroll = function  (){
           const heightDocument = document.documentElement.scrollTop;//cái khoảng cách thanh scroll kéo so vs top
         
           const newWidth_cd= widthCD-heightDocument;//chiều rộng mới của cd
          /*  console.log(newWidth_cd) */
           newWidth_cd >  0 ?  document.querySelector('.cd').style.width=newWidth_cd + 'px':
           document.querySelector('.cd').style.width=0
           document.querySelector('.cd').style.opacity= newWidth_cd / widthCD ;
          
       }

       /* handle rotate CD  */ //cd_thumb đc khai báo trên đầu 
        const cdRotate = cd_thumb.animate(
            [{transform :' rotate(360deg)'
        
        }], {
            duration : 10000,
            iterations :Infinity

        } )
        cdRotate.pause();//pause lại nếu ko chưa có nhạc đã chạy rồi 
       /* end Rotate cd  */
     


       /* xử lí bấm lay bài hát */   /* dở là ở đây này nên đặ biến nếu có là audio play hoặc ko  */
       btn_toggle_play.onclick = function(){
           if(player.classList.contains('playing')){
               audio.pause();
           }
           else{
               audio.play();

           }
           //khi audio play
           audio.onplay = function(){
          
               player.classList.add('playing');
               //cd romate
               cdRotate.play();
           }
           //khi audio pause

           audio.onpause = function(){
            player.classList.remove('playing');
            cdRotate.pause();
        }
        //lắng nghe sự thay đổi audio để còn tua
        audio.ontimeupdate = function(){
            if(audio.duration){
                const currentTime = audio.currentTime/audio.duration *100;
                progress.value =currentTime;
            }
        }
        //tua 
        progress.onchange = function(e){
           // console.log(e)
            const time_s = e.target.value /100 * audio.duration ;
            //khi thay đổi thi thời gian hiện tại của audio sẽ thay đổi 
            audio.currentTime = time_s;
        }

 
       }/* kết thúc sự kiện bấm nút play */

       /* handle next song  */
       const next_song = document.querySelector('.btn-next');
       next_song.onclick = function(){

        /* nếu bấm random  */
           if(music_random.classList.contains('active')){
               _this.handle_Random();
           }
           else{

               _this.currentIndex_song++;
           }
           if(_this.currentIndex_song > _this.songs.length-1){
               _this.currentIndex_song =0 ;
           }
           _this.loadingCurrent_song();//load lại bài hát mới chuyển 
           audio.play();
           player.classList.add('playing');
           cdRotate.play();
           _this.render();//để reder lại cái active màu hồng của bài đang đc phát 
       
           _this.scrollIToact();
           
       }
           /* handle back song  */
           const back_song = document.querySelector('.btn-prev');
           
           back_song.onclick = function(){
         
            if(music_random.classList.contains('active')){
                _this.handle_Random();
            }
            else{

                _this.currentIndex_song --;
            }

               if(_this.currentIndex_song < 0){
                   _this.currentIndex_song = _this.songs.length-1 ;
               }
              
               _this.loadingCurrent_song();
               audio.play();
           player.classList.add('playing')
           cdRotate.play();
           _this.render();//để reder lại cái active màu hồng của bài đang đc phát 

           }
 /* end handle back song  */
           /* start random_song */
           music_random.onclick = function(){
               music_random.classList.toggle('active');
           
           }
           /* end random_song */
           /* repeat */
           repeat_song.onclick = function(){
    
                repeat_song.classList.toggle('active');

           }
           /* nếu kết thúc bài thì tự chuyển  */
           audio.onended = function(){
               if(repeat_song.classList.contains('active')){
                   audio.play();
               }
               else{

                   next_song.click()
               }
              
           }
           //hàm sử lí khi click vào từng bài hát trong playlish 
           
           playlist.onclick = (e)=>{
            const songNode = e.target.closest('.song:not(.active)')//lấy ra bài hát mà chưa được phát ( ko có cái màu hồng )
            const option  = e.target.closest('.option')//lấy ra cái kí tự chứa option ( cái này kiểu để  tùy chỉnh  bài hát )
            if(songNode || !option){
                  if(songNode){
                     _this.currentIndex_song = Number(songNode.getAttribute('index-song'))
                    _this.render();
                    _this.loadingCurrent_song();
                    player.classList.add('playing');
                    cdRotate.play();
                    audio.play();
                  }
            }
           
        }
        

           

    },
    //sử lí scrollintoview 
    scrollIToact  : function(){
        setTimeout(()=>{
            const song_active= document.querySelector('.song.active');
            
            song_active.scrollIntoView({
                behavior: 'smooth', 
                block: 'end',
            })
        },200)
    },

    /* hàm sử lí random bài hát khi nào bấm chuyển bài mà nút random có active thì chạy cái này  */
    handle_Random : function(){
       let newNumber ;
         do{
             let x = Math.random();
             newNumber = Math.floor(x*(this.songs.length))
         }
         while(newNumber === this.currentIndex_song)
         this.currentIndex_song = newNumber;          
    
    },

    /* Sử lí repeat */
   /*  handle_repeat_song : function(){
    }, */


    /* export img the song current playy  */
    loadingCurrent_song : function(){
 
        heading.innerHTML =   `<h2>${this.getCurrentIndex_song().name}</h2>`;
        cd_thumb.style.backgroundImage = `url('${this.getCurrentIndex_song().image}')`
        audio.src = this.getCurrentIndex_song().path;
        
    },




    start : function(){
      //lắng nghe các sự kiện 
      
        this.handelEvents();
       
        //tải thông tin của bài hát đầu tiên
      //  this.getCurrentIndex_song();
        this.loadingCurrent_song();
        //render ra các tên danh sách bài hát
        this.render();
        
    }


}
app.start();