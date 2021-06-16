uniform float uTime;

varying vec2 vUv;

void main()
{
  float pattern = step(0.94, mod((vUv.x * 90.0) + uTime * 1.9, 1.0));
  pattern += step(0.94, mod((vUv.y * 90.0), 1.0));

  gl_FragColor = vec4(vec3(1.0 - pattern), 1.0);
}