(function(){
  var d=document;
  var t=d.getElementById('today');
  if(t){t.textContent=new Date().toLocaleDateString('hi-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});}
  var sb=d.getElementById('sbtn'),box=d.getElementById('sbox');
  if(sb&&box){sb.addEventListener('click',function(){box.classList.toggle('open');var i=box.querySelector('input');if(i)i.focus();});}
  var bb=d.getElementById('bbtn'),m=d.getElementById('menu');
  if(bb&&m){bb.addEventListener('click',function(){m.classList.toggle('open');});}
  var tt=d.getElementById('trendtxt');
  if(tt){
    var items=[].slice.call(d.querySelectorAll('.tile h3')).map(function(h){return h.textContent;});
    var extra=[].slice.call(d.querySelectorAll('.card h3 a')).map(function(h){return h.textContent;});
    items=items.concat(extra).filter(function(v,i,a){return a.indexOf(v)===i;}).slice(0,6);
    var k=0;function show(n){k=(n+items.length)%items.length;tt.textContent=items[k];}
    var p=d.getElementById('tprev'),n=d.getElementById('tnext');
    if(p)p.addEventListener('click',function(){show(k-1);});
    if(n)n.addEventListener('click',function(){show(k+1);});
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){show(k+1);},5000);
  }
  var up=d.getElementById('totop');
  if(up){window.addEventListener('scroll',function(){up.classList.toggle('show',window.scrollY>400);});
    up.addEventListener('click',function(){window.scrollTo({top:0});});}
})();

/* language switcher: Hindi is the site language; every other language uses Google Translate on the whole page */
(function(){
  var BASE='hi',d=document,btn=d.getElementById('langbtn'),list=d.getElementById('langlist');
  if(!btn||!list)return;
  function cookie(n){var m=d.cookie.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):'';}
  var cur=(cookie('googtrans')||'/'+BASE+'/'+BASE).split('/')[2]||BASE;
  if(!list.querySelector('[data-l="'+cur+'"]'))cur=BASE;
  var li=list.querySelector('[data-l="'+cur+'"]');
  if(li){d.getElementById('langcode').textContent=li.getAttribute('data-c');d.getElementById('langfl').className='fl fl-'+li.getAttribute('data-f');}
  function setCookie(val,del){
    var exp=del?'; expires=Thu, 01 Jan 1970 00:00:00 GMT':'';
    var host=location.hostname,base='googtrans='+val+'; path=/'+exp;
    d.cookie=base;
    if(/[a-z]/i.test(host)&&host.indexOf('.')>-1){
      d.cookie=base+'; domain='+host;
      d.cookie=base+'; domain=.'+host.replace(/^www\./,'');
    }
  }
  function setLang(l){
    if(l===BASE){setCookie('',true);}else{setCookie('/'+BASE+'/'+l,false);}
    try{localStorage.setItem('lang',l);}catch(e){}
    location.reload();
  }
  function toggle(open){list.hidden=!open;btn.setAttribute('aria-expanded',open);}
  btn.addEventListener('click',function(e){e.stopPropagation();toggle(list.hidden);});
  list.addEventListener('click',function(e){var t=e.target.closest('li');if(t)setLang(t.getAttribute('data-l'));});
  list.addEventListener('keydown',function(e){if(e.key==='Enter'){var t=e.target.closest('li');if(t)setLang(t.getAttribute('data-l'));}});
  d.addEventListener('click',function(){toggle(false);});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false);});
  // keep brand/phone/address untranslated-safe
  [].forEach.call(d.querySelectorAll('.logo,.brand,.wa-float'),function(n){n.classList.add('notranslate');});
  d.documentElement.lang=cur;
  window.googleTranslateElementInit=function(){
    new google.translate.TranslateElement({pageLanguage:BASE,autoDisplay:false},'google_translate_element');
    // fallback: if the cookie was not picked up, drive the hidden dropdown directly
    var tries=0,iv=setInterval(function(){
      var sel=d.querySelector('select.goog-te-combo');tries++;
      if(sel){clearInterval(iv);if(sel.value!==cur){sel.value=cur;sel.dispatchEvent(new Event('change'));}}
      else if(tries>40)clearInterval(iv);
    },250);
  };
  if(cur!==BASE){var sc=d.createElement('script');sc.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';d.body.appendChild(sc);}
})();
