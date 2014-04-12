CS-3451-GPU-Programming
=======================
CS 3451, Spring 2014

Homework 4: GPU Programming

Due: 11:55pm, Wednesday, April 9, 2014
Objective

The purpose of this assignment is to use the GPU (vertex and fragment processors) to carry out various rendering tasks. You will write three short fragment programs that carry out various rendering task. In addition, you will write one vertex program that will change the geometry of a simple surface dynamically. Please note that you must use Processing version 2.0+ for this project! (See note below.)
The Tasks

The code that you create will take the simple examples we provide and modify them to carry out a set of tasks. Here is a list of the four tasks:
Swiss Cheese
The first task is to take the polygon with transparent stripes and modify it so that the polygon has a number of circular holes. You will do this by modifying the alpha value on a per-fragment basis. In particular, you should create an array of holes on the polygon that are arranged in a grid of 3 by 3. Make sure that this polygon is the last one drawn, so the transparency will be handled correctly from all viewing directions.

Mandelbrot Set
The second task is to draw the fractal known as the Mandelbrot Set. You will take one of the squares from the example code and modify it so that you display a white Mandelbrot set on some colored background. The colors (and possibly color bands) for the background are for you to decide. Let z(n+1) = z(n)^2 + c, where z and c are both complex numbers. The Mandelbrot set is essentially a map of what happens when using different values of c (which correspond to different locations in the plane). Let z(0) = (0,0), and look at the values z(1)=z(0)^2+c, z(2)=z(1)^2+c, and so on. Plugging the result of a function back into itself is called iteration. If these iterated values stay near zero (never leave a circle of radius 2), then draw a white dot at the location c. If the values do leave the circle, color them something else. Do this for all the values for values of c such that cx is in [-2.1,0.9] and cy is in [-1.5,1.5]. The result is the Mandelbrot Set. Use 20 iterations of the function to create your Mandelbrot set.

Edge Detection
The third task is to perform what is called "edge detection" in the image processing literature. You will write a GLSL fragment program to perform several texture lookups in order to find edges in images. We will provide the input images as a texture (a picture of a duck). Since we wish to do this for a grey-scale image, and because the input image is in color, you will first have to convert color pixels to grey-scale values. You can compute the intensity value for a pixel by a weighted sum of the RGB values of the pixels with weights 0.2989, 0.5870, 0.1140 respectively (why these values? Remember human color perception theory?). Then you will use what is known as a Laplacian filter to estimate the "edge-ness" of a pixel. The Laplacian filter simply takes the values of the four surrounding pixels, sums them, and subtracts four times the value of the middle pixel. You will have to map the resulting value to the range of grey-scale values that can be displayed. You may need to multiply by a scaling factor to see the edges easily.

Mountain Generator
The fourth and final task is to write a vertex program to modify the geometry of a collection of polygons. Your task is to replace one of the quads with a "mountain generator". You will need to subdivide the original quad with many tiny quads by modifying the Processing code in P4.pde. Then your vertex program will displace these vertices along the normal vector using the intensity of the closest texel to the vertex (again convert to grey-scale as in part 3). Note that you will need to subdivide the quad in both x and y directions. Do *not* modify the geometry in the P4.pde file -- this must be done in the vertex shader! You should pass a collection of equal area, planar quads into the shader. You should subdivide the quad into at least a 20x20 grid, but no more than a 50x50 grid.

Sample results (using RGBgradient.jpg)



Provided Code

All of the code that we provide is here. This example program draws four squares upright on a ground plane. Moving the mouse in the window rotates the view of this scene. will lock the rotation to its current value. Keys 1-5 will switch the texture used for the mountain generator Clicking and dragging will move the camera in the xy plane Mouse wheel will zoom the camera along the z axis
You should tackle this assignment by modifying the fragment and vertex code to carry out the tasks listed above. One by one, you should modify the simple polygons that we provide into much more beautiful polygons that show off the power of GLSL programming. The key to success in programming GLSL is to make small changes to working code, and verify that each of your changes does what you expect. Do not expect to write an entire GLSL program from scratch, replace the example code, and have it work beautifully the first time. Debugging GLSL code is an art. You can't single-step through GLSL code, you can't set breakpoints, and you can't print out intermediate values. Your only form of output from GLSL programs is the resulting image you see on the screen. To debug, you must make clever use of the framebuffer to display intermediate values as pixel colors. Don't forget that pixel colors must be in the range of zero to one.

There are five fragment programs, and they have names "cardX.frag", where X is an integer from 0 to 4. These programs are in the sub-directory called "data", and must remain there for the Processing program to find them. You will need to modify some of these to create the necessary fragment shaders for the first three tasks. Processing does not know these files are code, and so you cannot modify them from within the Processing development environment. You should edit them using any text editor that supports plain text files. card0.frag is used to render the floor tile and should not be modified. We suggest that you start by modifying card1.frag for the swiss cheese example because it already shows how to modify the alpha channel(transparency). The file card3.frag uses the image texture called "duckTexture"( the file duck.bmp) You can write your edge detection program based on that.

There are five examples of vertex programs, and they are called cardX.vert, where X is an integer from 0 to 4. These are also in the sub-directory "data", and should stay there. Modify card3.vert for the mountain generator task. In the example code card0.vert, the vertex programs calculate the surface normal, convert the vertex from the world space to the eye space, and create a vector that points from the vertex to the light.

It should be noted that GLSL programs are not well supported by very old graphics cards. If you run the provided code and do not see a duck image, a translucent green card, a gradient image, and a red plane, your graphics card may be too old. Do not be surprised if the program does not work on your machine. If this is the case, you can use the machines in the Baird lab (CCB 103).

GLSL Resources

Here is the processing reference page for GLSL shaders Prcessing Shader Tutorial
Here are some tutorials for GLSL:
HeNe Tutorial
Lighthouse Tutorial
Here are some additional links for GLSL:
GLSL Links
Authorship Rules

The code that you turn in must be your own. You are allowed to talk to other members of the class and to the instructor and the TA about general implementation of the routines for the assignment. It is also fine to seek the help of others for general programming questions. You may not, however, use code that anyone other than yourself has written. Code that is explicitly not allowed includes code taken from the Web, from books, or from any source other than yourself. The only exception to this rule is that you should feel free to use any of the routines that we provide. You should not show your code to other students. If you need help debugging, seek the help of the TA or of the instructor.

What To Turn In

Compress all neccessary files to run your program into a zip archive and submit it on T-square. The filename should be "last_first_p4.zip". Make sure that you include all of your modified shaders in the sub-directory "data", as well as your modified version of P4.pde.

