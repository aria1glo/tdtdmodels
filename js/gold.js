/* gold.js — flowing liquid-gold background for the home hero.
   A small WebGL fragment shader (domain-warped noise, lit like silk).
   No video file needed. Falls back to the CSS gradient if WebGL is missing,
   and renders a single still frame for visitors who prefer reduced motion. */
(function () {
  const hero = document.querySelector(".hero");
  const canvas = hero && hero.querySelector("canvas");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) { canvas.remove(); return; }

  const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }";
  const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1.,0.)), f.x), mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= .5; }
  return v;
}
float field(vec2 p, float t){
  vec2 q = vec2(fbm(p + vec2(0., t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.8 * q + vec2(1.7, 9.2) + .6 * t), fbm(p + 1.8 * q + vec2(8.3, 2.8) - .5 * t));
  return fbm(p + 1.8 * r);
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y * 0.85;
  float t = uTime * .045;
  float e = .02;
  float f = field(p, t), fx = field(p + vec2(e, 0.), t), fy = field(p + vec2(0., e), t);
  vec3 n = normalize(vec3((f - fx) / e * .75, (f - fy) / e * .75, 1.));
  vec3 L = normalize(vec3(-.45, .55, .75));
  float diff = clamp(dot(n, L), 0., 1.);
  vec3 H = normalize(L + vec3(0., 0., 1.));
  float spec = pow(clamp(dot(n, H), 0., 1.), 36.);
  float fres = pow(1. - n.z, 2.);

  vec3 deep = vec3(.06, .02, .015), burg = vec3(.34, .05, .08);
  vec3 gold = vec3(.86, .62, .2),   pale = vec3(1., .93, .66);
  vec3 col = mix(deep, burg, smoothstep(.1, .5, f) * .8);
  col = mix(col, gold, smoothstep(.15, .95, diff) * (.55 + .6 * smoothstep(.25, .75, f)));
  col += pale * spec * .9 + gold * fres * .25;
  col *= mix(.55, 1.05, smoothstep(1.25, .1, length(uv - .5) * 1.5));
  gl_FragColor = vec4(col, 1.);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.remove(); return; }
  const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "uRes"), uTime = gl.getUniformLocation(prog, "uTime");

  const SCALE = window.innerWidth < 700 ? 0.42 : 0.55; // render smaller, CSS scales it up (soft look + fast)
  function resize() {
    canvas.width = Math.max(2, Math.round(hero.clientWidth * SCALE));
    canvas.height = Math.max(2, Math.round(hero.clientHeight * SCALE));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize(); window.addEventListener("resize", resize);

  function draw(t) { gl.uniform2f(uRes, canvas.width, canvas.height); gl.uniform1f(uTime, t); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { draw(18); window.addEventListener("resize", () => draw(18)); return; }

  let visible = true, start = performance.now();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(hero);
  (function loop(now) {
    if (visible && !document.hidden) draw(18 + (now - start) / 1000);
    requestAnimationFrame(loop);
  })(start);
})();
