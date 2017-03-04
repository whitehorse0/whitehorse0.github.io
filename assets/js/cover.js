var text="<!DOCTYPE html>";
	text+=document.getElementsByTagName('html')[0].innerHTML;
	text=text.replace(/\s*(\n\s*)+/ig,'').replace(/\s+(?= )/g,'').split("");
var image=new Image(),
	span=$('<span>',{'text':'.'});
$('#whitehorse0').append(span);
var span_width=span.width(),
	span_height=span.height();
	
span.remove();
image.crossOrigin='';
image.src='assets/img/whitehorse.jpg';
image.onload=function(){

	var cnvs=document.createElement('canvas');
	cnvs.width=image.width;
	cnvs.height=image.height;
	$('body').append(cnvs);

	var ctx=cnvs.getContext('2d');
	ctx.drawImage(image,0,0);

	var per_box=Math.floor(((cnvs.width*cnvs.height)/text.length)),
		ratio=span_height/span_width,
		x_size=Math.sqrt(per_box/ratio),
		y_size=per_box/x_size,
		imageData;

	try{
	  imageData=ctx.getImageData(0,0,cnvs.width,cnvs.height);
	}catch(e){
	  alert('Please try Firefox 9+ or Chrome!');
	}

	getPoints(imageData);
	$(cnvs).remove();

	function getPoints(imagedata){
		var points=[],i=0,lastSeven='',title=false;
		for(var y=0;y<cnvs.height-1;y+=y_size){
			var total=0,row=$('<span>').css({'display':'block','height':span_height});
			for(var x=0;x<cnvs.width-1;x+=x_size){
				var color=getColor(imageData,x,y),
				character=text[i];
				if(character=="<")title=false;
				if(title)color="#fff";
				if(!color)color='#444';
				points.push([x,y]);
				character=text[i];
				i++;
				total++;
				$(row).append($("<span>",{'style':'color:'+color,'text':character}));
				lastSeven = (lastSeven + character).substr(-7);
				if(lastSeven=="<"+"title"+">")title=true;
			}
			$('#whitehorse0').append(row);
		}
		return points;
	}
};
/* get the color */
function getColor(imageData,x,y) {
	var x=Math.round(x),
		y=Math.round(y),
		index=(y*imageData.width+x)*4,
		red=imageData.data[index],
		green=imageData.data[index+1],
		blue=imageData.data[index+2],
		alpha=imageData.data[index+3];
	if(red==0&&green==0&&blue==0){
		return false;
	}
	return "rgb("+red+","+green+","+blue+");";
}