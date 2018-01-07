var  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  auroraColors = ['#6bf9da', '#216efc', '#b254ee'],
  auroraGrad = select('#auroraGrad'),
  aurora = select('.aurora'),
  mountains = selectAll('.mountains *'),
  mountainMask = select('.mountainMask'),
  outline = select('.outline'),
  outlineBg = select('.outlineBg'),
  auroraStops = selectAll('.auroraStops')


TweenMax.set('svg', {
  visibility: 'visible'

})
/* TweenMax.set('.mountainGroup', {

 scale:0.5,
 transformOrigin:'30% 30%'
}) */

var mainTl = new TimelineMax({});
var auroraGradTl = new TimelineMax({repeat:-1});
auroraGradTl.staggerTo(auroraStops, 0.42, {
  cycle:{
    stopColor:[auroraColors[1], auroraColors[2],auroraColors[0]]
  },
  ease:Sine.easeInOut
},0)
  .staggerTo(auroraStops, 0.42, {
    cycle:{
      stopColor:[auroraColors[2], auroraColors[0],auroraColors[1]]
    },
    ease:Sine.easeInOut
  },0)
  .staggerTo(selectAll('.auroraStops'), 0.42, {
    cycle:{
      stopColor:[auroraColors[0], auroraColors[1],auroraColors[2]]
    },
    ease:Sine.easeInOut
  },0)


var mountainTl = new TimelineMax({repeat:-1, repeatDelay:0});
mountainTl.to([outline, aurora, mountainMask], 1.5, {
  attr:{
    r:'-=190'
  },
  ease:Elastic.easeIn.config(0.61,0.8),
  repeat:1, yoyo:true
})
  .staggerTo(mountains, 2.75, {
    cycle:{
      transformOrigin:['60% 0%', '40% 0%'],
      x:[-380],
    },
    ease:Expo.easeInOut
  }, 0.1,'-=3')

  .to(outlineBg, 1.5, {
    attr:{
      r:'+=20'
    },
    repeat:1,
    yoyo:true,
    ease:Elastic.easeIn.config(0.91,0.48)
  },'-='+mountainTl.recent().duration())

//auroraGradTl.duration(mountainTl.duration())
mainTl.add(auroraGradTl, 0);
mainTl.add(mountainTl, 0);
//TweenMax.globalTimeScale(0.5)
