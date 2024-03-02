#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

void median_filter(inout vec4[9] matrix_of_pixel) 
{
  for (int l = 0; l < 4; l++) {
    for (int i = 0; i < 9; ++i) {
      int j = i;
      for (; (j >= 0) && (matrix_of_pixel[i][l] <= matrix_of_pixel[j][l]); j--) {}
      if (j == -1) {
        j++;
      }
      if (matrix_of_pixel[i][l] > matrix_of_pixel[j][l]) {
        j++;
      }
      vec4 tmp = matrix_of_pixel[j];
      matrix_of_pixel[j] = matrix_of_pixel[i];
      matrix_of_pixel[i] = tmp;
    }
  }
}

void main()
{
  vec4 matrix_of_pixel[9];
  for (int i = -1; i < 2; i++) {
    for (int j = -1; j < 2; j++) {
      matrix_of_pixel[(i + 1) * 3 + (j + 1)] = textureLod(colorTex, surf.texCoord + vec2(i, j), 0);
    }
  }
  median_filter(matrix_of_pixel);
  color = (matrix_of_pixel[4]);

}
