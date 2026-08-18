(function(){
  const css=`
  :root{--br-black:#080808;--br-yellow:#ffc400;--br-white:#fff}
  .br-site-header{position:sticky;top:0;z-index:100;background:var(--br-black);color:#fff;border-bottom:1px solid #292929;font-family:Arial,Helvetica,sans-serif}
  .br-contactbar{background:#111;border-bottom:1px solid #2b2b2b;font-size:.82rem}
  .br-contactbar-inner,.br-mainbar{width:min(1160px,calc(100% - 36px));margin:auto}
  .br-contactbar-inner{min-height:32px;display:flex;align-items:center;justify-content:flex-end;gap:20px}
  .br-site-header a,.br-site-header a:visited{color:#eee;text-decoration:none}
  .br-contactbar a{font-weight:800}.br-contactbar a:hover{color:var(--br-yellow)}
  .br-mainbar{min-height:74px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .br-brand{display:flex;align-items:center;flex:0 0 auto}.br-brand img{display:block;height:54px;width:auto;max-width:245px}
  .br-navright{display:flex;align-items:center;gap:12px}.br-links{display:flex;align-items:center;gap:16px;font-size:.93rem;font-weight:800}
  .br-links a:hover{color:var(--br-yellow)}
  .br-menu{position:relative}.br-menu summary{list-style:none;cursor:pointer;border:1px solid #555;border-radius:8px;padding:9px 12px;font-weight:900;color:#fff;white-space:nowrap}.br-menu summary::-webkit-details-marker{display:none}.br-menu[open] summary{border-color:var(--br-yellow);color:var(--br-yellow)}
  .br-menupanel{position:absolute;right:0;top:46px;width:300px;background:#fff;border:1px solid #d7d7d7;border-top:5px solid var(--br-yellow);border-radius:10px;box-shadow:0 16px 40px rgba(0,0,0,.28);padding:8px;z-index:120}
  .br-menupanel a,.br-menupanel a:visited{display:block;color:#111!important;padding:10px 11px;border-radius:6px;font-weight:800}.br-menupanel a:hover{background:#f2f2ef}
  .br-cta{background:var(--br-yellow);color:#080808!important;padding:10px 13px;border-radius:8px;font-weight:950;white-space:nowrap}
  @media(max-width:940px){.br-links{display:none}}
  @media(max-width:650px){.br-contactbar-inner,.br-mainbar{width:min(100% - 20px,1160px)}.br-contactbar-inner{justify-content:center;gap:12px;min-height:38px;font-size:.76rem;flex-wrap:wrap;padding:4px 0}.br-mainbar{min-height:64px;gap:8px}.br-brand img{height:42px;max-width:155px}.br-cta{font-size:.72rem;padding:9px 9px}.br-menu summary{font-size:.72rem;padding:8px 9px}.br-menupanel{position:fixed;left:10px;right:10px;top:102px;width:auto}.br-navright{gap:7px}}
  @media(max-width:430px){.br-contactbar-inner{gap:8px}.br-contactbar a{font-size:.72rem}.br-brand img{height:38px;max-width:135px}.br-cta{display:none}}
  `;
  const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  const old=document.querySelector('header');if(!old)return;
  const header=document.createElement('header');header.className='br-site-header';
  header.innerHTML=`<div class="br-contactbar"><div class="br-contactbar-inner"><a href="tel:+15866463950">586-646-3950</a><a href="mailto:wayne@breadytraining.com">wayne@breadytraining.com</a></div></div><div class="br-mainbar"><a class="br-brand" href="/"><img src="bready-logo-transparent.png" alt="B-Ready Training"></a><div class="br-navright"><nav class="br-links"><a href="/#training">Training</a><a href="/#about">About</a><a href="safety-learning-hub.html">Learning Center</a><a href="pricing.html">Pricing</a><a href="service-area.html">Service Area</a></nav><details class="br-menu"><summary>MENU ▾</summary><div class="br-menupanel"><a href="/">Home</a><a href="/#about">About Wayne</a><a href="pit-forklift-training.html">PIT / Forklift — Classes I–VII</a><a href="awp-mewp-training.html">AWP / MEWP Training</a><a href="overhead-crane-training.html">Overhead Crane Training</a><a href="train-the-trainer.html">Train-the-Trainer</a><a href="safety-learning-hub.html">Safety Learning Center</a><a href="pricing.html">Pricing</a><a href="service-area.html">Service Area</a><a href="request-training.html">Request Training / Quote</a></div></details><a class="br-cta" href="request-training.html">REQUEST TRAINING</a></div></div>`;
  old.replaceWith(header);
})();