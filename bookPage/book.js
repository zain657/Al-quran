let info=JSON.parse(localStorage.getItem("info")),content=document.getElementById("content"),title=document.getElementById("title"),currentPage=1;const itemsPerPage=10;let prev=document.getElementById("prev"),next=document.getElementById("next"),audio=document.getElementById("audio");alert('"Click on the verse you want to hear " "اضغط على الايه التي تريد سماعها"  '),"ar"==info.selectedLanguage?document.documentElement.dir="rtl":document.documentElement.dir="ltr";let allSurah=[];async function getSurahApi(e){try{let t=await fetch(`https://api.alquran.cloud/v1/quran/${e}`),a=await t.json();allSurah=a.data.surahs[info.num].ayahs,displayPage(currentPage)}catch(e){}}function retreve(e,t){let a=`<div index="0" class="ayah ti top-a mb-4 rounded-4">${e[0].text}</div>`,n="",l=e.length;for(let a=0;a<l;a++)n+=`\n            <div index='${e[a].numberInSurah}' class="ayah">${e[a].text}</div>\n            <div class="circle bg-success rounded-circle"><span class="p-3">${t+a+1}</span></div>\n        `;content.innerHTML=n,title.innerHTML=a}function displayPage(e){let t=10*(e-1),a=10*e;retreve(allSurah.slice(t,a),t),updateButtons()}function updateButtons(){let e=Math.ceil(allSurah.length/10);prev.disabled=1===currentPage,next.disabled=currentPage===e}prev.addEventListener("click",(()=>{currentPage>1&&(currentPage--,displayPage(currentPage))})),next.addEventListener("click",(()=>{let e=Math.ceil(allSurah.length/10);currentPage<e&&(currentPage++,displayPage(currentPage))})),getSurahApi(info.selectedType);let allReader=[];async function getReaderApi(e){try{let t=await fetch(`https://api.alquran.cloud/v1/quran/${e}`),a=await t.json();allReader=a.data.surahs[info.num].ayahs}catch(e){}}let click=[],count=0;function playAudio(e){let t=Array.from(document.getElementsByClassName("ayah")),a=t.indexOf(e)-1;if(a>=0&&a<allReader.length){if(audio.src=allReader[e.getAttribute("index")-1].audio,audio.play(),click.push(a),t[a+1].style.backgroundColor="#b09333",count>0&&click.length>1){t[click[0]+1].style.backgroundColor="transparent",click.shift()}count++}}document.addEventListener("click",(async function(e){e.target.classList.contains("ayah")&&(await getReaderApi(info.selectedReader),playAudio(e.target))}));