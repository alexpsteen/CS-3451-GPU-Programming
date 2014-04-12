//card2.frag: fragment shader for the mandelbrot card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);
  vec4 diffuse_color_mandel = vec4 (1.0, 1.0, 1.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  float cX = ((float(vertTexCoord.x)*3.0)-2.1);
  float cY = ((float(vertTexCoord.y)*3.0)-1.5);
  float real = 0.0;
  float img = 0.0;
  for(int i=0;i<20;i++){
  	float tempReal = (float(real*real))-(float(img*img));
  	float tempImg = 2.0*real*img;
  	real = tempReal+cX;
  	img = tempImg+cY;
  	float distance = sqrt((real*real)+(img*img));
  	if(distance>2){
		gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0); 			
		return;
 	}
  }
  gl_FragColor = vec4(diffuse * diffuse_color_mandel.rgb, 1.0); 
}