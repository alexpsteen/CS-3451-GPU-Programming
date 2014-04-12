//card4.vert: vertex shader for the mountain card

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
// texMatrix 3D positions are mapped to screen
// this is mapping the texture to the screen
uniform mat4 texMatrix;
uniform sampler2D texture;


// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

void main() {
	// displace based on color on texture
    vertColor = color;
    vertNormal = normalize(normalMatrix * normal);
    vec4 vert = vertex;
    vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);
    vec4 textColor = texture2D(texture, vertTexCoord.xy);

    // greyscale the color the that is a scalar for the normal in which you are moving the vector
    float greyColor = (textColor.r)*0.2989+(textColor.g)*0.5870+(textColor.b)*0.1140;
    // need to math vec4 with vec4
    vert+=vec4(vertNormal*greyColor*200,0.0);

    //gl_Position final vertex
    gl_Position = transform * vert;
    vertLightDir = normalize(-lightNormal);

}