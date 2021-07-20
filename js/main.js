const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.playlist')
const cd = $('.cd')
const cdwidth = cd.offsetWidth
const heading = $('header h2')
const cdThum = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnnext = $('.btn-next')
const btnpre = $('.btn-prev')
const btnramdom = $('.fa-random')
const btnRepeat = $('.btn-repeat')







const app = {
    IsPlay : false,
    currentIndex : 0,
    IsRamdom : false,
    Isrepeat: false,
    songs :[
    {casi:'Only-C',idsong:1 ,src:"../media/thaylayeuthuong.mp3",srchinh:"../images/item1.jpg",ten:"Thấy là yêu thương - Only C"},
    {casi:'Sơn Tùng M-TP',idsong:2 ,src:"../media/emcuangayhomqua.mp3",srchinh:"../images/item2.jpg",ten:"Em của ngày hôm qua - Sơn Tùng M-TP"},
    {casi:'Sơn Tùng M-TP',idsong:3 ,src:"../media/haytraochoanh.mp3",srchinh:"../images/item3.jpg",ten:"Hãy trao cho anh - Sơn Tùng M-TP"},
    {casi:'Bray',idsong:4 ,src:"../media/dungtinher.mp3",srchinh:"../images/item4.jpg",ten:"Đừng tin her - Bray"},
    {casi:'Dj.Snake',idsong:5 ,src:"../media/cogaivang.mp3",srchinh:"../images/item7.jpg",ten:"Cô Gái Vàng - HuyR "},
    {casi:'Dj.Snake',idsong:6 ,src:"../media/getlow.mp3",srchinh:"../images/uk1.jpg",ten:"Dillon Francis, DJ Snake"},
    {casi:'Dj.Snake',idsong:7 ,src:"../media/leanon.mp3",srchinh:"../images/uk2.jpg",ten:"Major Lazer & DJ Snake - Lean On "},
    {casi:'Dj.Snake',idsong:8 ,src:"../media/lightitup.mp3",srchinh:"../images/uk3.jpg",ten:"Major Lazer – Light it Up"},
    {casi:'Dj.Snake',idsong:9 ,src:"../media/tokyo.mp3",srchinh:"../images/uk4.jpg",ten:"Tokyo Drift - Teriyaki Boyz"},
    {casi:'Dj.Snake',idsong:10 ,src:"../media/animal.mp3",srchinh:"../images/uk5.jpg",ten:"Martin Garrix - Animals"},
    {casi:'Dj.Snake',idsong:11 ,src:"../media/oldtownroad.mp3",srchinh:"../images/uk6.jpg",ten:"Lil Nas X - Old Town Road"},
    {casi:'Dj.Snake',idsong:12 ,src:"../media/heymama.mp3",srchinh:"../images/uk7.jpg",ten:"David Guetta - Hey Mama"},
    {casi:'Dj.Snake',idsong:13 ,src:"../media/worthit.mp3",srchinh:"../images/worthit.jpg",ten:"Fifth Harmony - Worth It"},
    {casi:'Dj.Snake',idsong:14 ,src:"../media/timber.mp3",srchinh:"../images/uk8.jpg",ten:"Pitbull - Timber ft. Ke$ha"},
    {casi:'Dj.Snake',idsong:15 ,src:"../media/despacito.mp3",srchinh:"../images/uk9.jpg",ten:"Luis Fonsi, Daddy Yankee - Despacito"},
    {casi:'Dj.Snake',idsong:16 ,src:"../media/tetdongday.mp3",srchinh:"../images/tet1.jpg",ten:"Tết Đong Đầy - KayTrần"},
    {casi:'Dj.Snake',idsong:17 ,src:"../media/saigondeplam.mp3",srchinh:"../images/tet2.jpg",ten:"Sài Gòn Đẹp Lắm "},
    {casi:'Dj.Snake',idsong:18 ,src:"../media/tetnguyendan.mp3",srchinh:"../images/tet3.jpg",ten:"Tết Nguyên Đán 2015"},
    {casi:'Dj.Snake',idsong:19 ,src:"../media/bacphan.mp3",srchinh:"../images/item10.jpg",ten:"Bạc Phận - JACK/K-ICM"}],

    render: function(){
            const htmls = this.songs.map((song,index)=>{
                return `
                        <div class="song ${index === this.currentIndex ? 'active': ''} " data-index=${index}>
                            <div class="thumb" style="background-image: url('${song.srchinh}')" >
                            </div>
                            <div class="body" >
                                <h3 class="title">${song.ten}</h3>
                                <p class="author">${song.casi}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                `

            })
            playlist.innerHTML = htmls.join('');
        },
    defineProperies: function(){
        Object.defineProperty(this,'currentSong',{
            get : function(){
                return this.songs[this.currentIndex]
            }
        })

    },
    loadCurrentSong:function(){
     

        heading.textContent = this.currentSong.ten
        cdThum.style.backgroundImage = `url('${this.currentSong.srchinh}')`
        audio.src = this.currentSong.src
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()

    },
    preSong: function(){
       
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()


    },
    ramdomSong: function(){
        let newindex
        do{
            newindex = Math.floor(Math.random() * this.songs.length)
        }while(newindex === this.currentIndex)
        this.currentIndex = newindex
        this.loadCurrentSong()

    },
    loadactiveSong:function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'center'
            })
        }, 300);

    },
    handleEvent: function(){
          // xoay dia 
          const  AnimationDisk =  cdThum.animate([
            {
                transform : 'rotate(360deg)'
            }
        ],{
            duration : 10000,
            iterations : Infinity
        }) 

        // play 
        audio.onplay = function(){
            app.IsPlay = true
            AnimationDisk.play()
            player.classList.add('playing')
        }

        //pause 
        audio.onpause = function(){
            app.IsPlay = false
            AnimationDisk.pause()
            player.classList.remove('playing')
        }
       
            // xu ly click play 

            playBtn.onclick = function(){
                if(app.IsPlay){
                    
                    audio.pause()
                }else{
                  
                    audio.play()
                   
                }
              
            }


            // xu ly phong to thu nho cd
            document.onscroll = function(){
                const scrollY = window.scrollY
               const newWidth = cdwidth - scrollY
               
               cd.style.width = newWidth>0 ? newWidth +'px' : '0px'
               cd.style.opacity = newWidth / cdwidth
            }

            // khi tien do bai hat thay doi 
            audio.ontimeupdate = function(){
                if(audio.duration){

                    const current = Math.floor(audio.currentTime / audio.duration *100)
                    progress.value = current

                }

            }

            // tua bai hat
            progress.onchange = function(e){
                const seekTime = audio.duration /100* e.target.value
                audio.currentTime = seekTime

            }

            //next bai 
            btnnext.onclick = function(){
                if(app.IsRamdom){
                    app.ramdomSong()
                    audio.play()
                    app.loadactiveSong()
                    app.render()
                }else{
                    app.nextSong()
                    audio.play()
                    app.loadactiveSong()
                    app.render()
                }
                
            }

            // pre
            btnpre.onclick = function(){
                if(app.IsRamdom){
                    app.ramdomSong()
                    audio.play()
                  
                    app.loadactiveSong()
                    app.render()
                }else{
                    app.preSong()
                    audio.play()
                   
                    app.loadactiveSong()
                    app.render()
                }
            }

            //random 
            btnramdom.onclick = function(){
                app.IsRamdom = !app.IsRamdom
                btnramdom.classList.toggle('active', app.IsRamdom)
            }



            //repeat 
            btnRepeat.onclick = function(){
                app.Isrepeat = !app.Isrepeat
                btnRepeat.classList.toggle('active', app.Isrepeat)
            }

            audio.onended = function(){
                if(app.Isrepeat){
                    audio.play()
                }else{
                    btnnext.click()
        
                }
                
            }

            //click play song
            playlist.onclick = function(e){
                const SongNode = e.target.closest('.song:not(.active)')
               if(SongNode || e.target.closest('.option')){
                if(SongNode ){
                    indexSong = SongNode.getAttribute('data-index')
                    app.currentIndex = Number(indexSong) 
                    app.loadCurrentSong()
                   audio.play()
                   app.render()

                }
                   
               }
            }


          
            

    },

    start : function(){
       
        //lang nghe su kien
        this.handleEvent()
          //dinh nghia cac thuoc tinh cho Object
        this.defineProperies()
         // render ra mang hinh
         this.render()
        //tai thong tin bai hat dau tien
         this.loadCurrentSong()

    }
}
app.start()






fetch("http://localhost:8089/tin-tuc")
.then(res=>res.json())
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})
