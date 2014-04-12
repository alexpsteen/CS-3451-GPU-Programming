//card1.frag: fragment shader for the swiss cheese card.

//ifdef required to make shader compatible with OpenGLES&WebGL
//sets the precision of the float and integer numbers to medium
#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

//define used by processing to determine the type of shader and whether or not it is valid to render the geometry in the sketch
//These defines are in fact hints for the renderer, and could be absent from the shader code altogether.
#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
// vect4 because verTexCoord has x,y,z,1 but we only only care about the x and y coordinates
// texture coordinate is just (s,t)
varying vec4 vertTexCoord;

void main() { 
  // diffuse_color is rbg and then alpha (opacity of object)
 	vec4 diffuse_color = vec4 (0.0, 1.0, 1.0, 1.0);
 	float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  //gl_FragColor rgb and alpha value and this tells you what to map a color to a pixel
  // the box is s=0 to s=1 and t=0 to t=1
 	//gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.8);
 	for(int i=0; i<3; i++){
 		for(int j=0; j<3; j++){
 			// now the current point is (i/4, j/4)
 			float xPos = float(1.0/6.0) + float(1.0/3.0)*i;
 			float yPos = float(1.0/6.0) + float(1.0/3.0)*j;
 			float distance = sqrt(((xPos-float(vertTexCoord.x))*(xPos-float(vertTexCoord.x)))+((yPos-float(vertTexCoord.y))*(yPos-float(vertTexCoord.y))));
 			if(distance<0.1111){
 				gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.0);
 				return;
 			}
 			else{
 				gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.8);
 			}
 		}
 	}
}

