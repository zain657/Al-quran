let surahElement,row=document.getElementById("row"),modal=document.getElementById("modal"),audio=document.getElementById("audio"),closebtn=document.getElementById("closebtn"),close1=document.getElementById("close"),modalTtile=document.getElementById("modalTtile"),info=JSON.parse(localStorage.getItem("info")),allSurah=[],surah="";async function getSurahApi(){try{let e=await fetch("https://api.alquran.cloud/v1/surah"),a=await e.json();allSurah=a.data,createSurahElement(allSurah),retreve(surah,row)}catch(e){}}function createSurahElement(e){if("ar"!==info.selectedLanguage)for(let a=0;a<e.length;a++)surah+=`<div  class="col-6 s-name">${e[a].englishName}</div>`;else for(let a=0;a<e.length;a++)surah+=`<div  class="col-6 s-name">${e[a].name}</div>`}function retreve(e,a){a.innerHTML=e}function aa(){surahElement=document.querySelectorAll(".s-name")}function closeModal(){modal.classList.remove("d-block"),audio.pause(),b=0}null==info&&(info={selectedLanguage:"ar",selectedType:"quran-uthmani",selectedReader:"ar.abdulsamad",num:-1},localStorage.setItem("info",JSON.stringify(info))),closebtn.addEventListener("click",closeModal),close1.addEventListener("click",closeModal);let allReader=[];async function getReaderApi(e,a){try{let t=await fetch(`https://api.alquran.cloud/v1/quran/${e}`),l=await t.json();allReader=l.data.surahs[a].ayahs,modalTtile.innerHTML=l.data.surahs[a].name}catch(e){}}let b=0;async function play(e){audio.removeEventListener("ended",handleAudioEnded),await getReaderApi(info.selectedReader,e),b=0,audio.src=allReader[b].audio,audio.addEventListener("ended",handleAudioEnded)}function handleAudioEnded(){b++,b<allReader.length?(audio.src=allReader[b].audio,audio.play()):b=0}async function sort(){await getSurahApi(),aa();for(let e=0;e<surahElement.length;e++)surahElement[e].addEventListener("click",(function(a){info.num=e,modal.classList.add("d-block"),play(e)}))}sort();