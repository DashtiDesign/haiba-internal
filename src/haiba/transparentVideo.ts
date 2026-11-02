/** Decode the pre-keyed RGB/alpha halves in one GPU pass, including on iOS. */
export function createTransparentRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; varying vec2 uv; void main(){gl_Position=vec4(position,0.,1.);uv=vec2((position.x+1.)*.5,(1.-position.y)*.5);}");
  const fragment = compile(gl.FRAGMENT_SHADER, "precision mediump float; varying vec2 uv; uniform sampler2D frame; void main(){vec3 rgb=texture2D(frame,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(frame,vec2(uv.x,.5+uv.y*.5)).r;gl_FragColor=vec4(rgb*a,a);}");
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!vertex || !fragment || !program || !buffer || !texture) return null;
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.viewport(0, 0, canvas.width, canvas.height);
  return {
    draw(video: HTMLVideoElement) {
      if (video.readyState < 2 || gl.isContextLost()) return false;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return true;
    },
    dispose() { gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); },
  };
}