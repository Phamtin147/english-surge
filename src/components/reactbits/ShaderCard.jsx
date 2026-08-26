import React, { useRef, useEffect, useState } from 'react';

// Vertex Shader
const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Fragment Shader: Exact Billowing Flame / Fire / Smoke Shader
const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec3 u_color1; // Base purple
  uniform vec3 u_color2; // Electric violet
  uniform vec3 u_color3; // Hot magenta / highlight

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; ++i) {
      v += a * noise(p);
      p = rot * p * 2.1 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y = 1.0 - uv.y; // Invert to match DOM coordinates

    // Normalize coordinates around bottom-right bias
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Mouse interaction distortion
    vec2 m = (u_mouse / u_resolution.xy) * 2.0 - 1.0;
    m.x *= u_resolution.x / u_resolution.y;
    float dist = length(p - m);
    if (dist < 1.0) {
      p -= (p - m) * exp(-dist * 3.5) * 0.25;
    }

    // Upward flowing flame animation
    vec2 movement = vec2(0.0, u_time * 0.7);
    
    // Domain Warping for billowing organic flame plumes
    vec2 q = vec2(fbm(p * 1.5 + movement), fbm(p * 1.5 + vec2(5.2, 1.3) + movement));
    vec2 r = vec2(fbm(p * 2.0 + 3.0 * q + vec2(1.7, 9.2) - movement * 0.6), fbm(p * 2.0 + 3.0 * q + vec2(8.3, 2.8) - movement * 0.6));
    
    float f = fbm(p * 1.8 + 3.5 * r);

    // Shape the rising fire plume (concentrated in bottom and right half)
    float verticalFade = smoothstep(1.1, -0.4, p.y + 0.15);
    float horizontalShape = smoothstep(-1.2, 0.6, p.x + 0.4);
    float flameIntensity = f * verticalFade * (0.6 + 0.4 * horizontalShape);

    // Color gradient mixing: Dark Base -> Saturated Purple -> Electric Violet -> Hot Magenta Core
    vec3 bgDark = vec3(0.02, 0.02, 0.06);
    vec3 col = mix(bgDark, u_color1, smoothstep(0.12, 0.45, flameIntensity));
    col = mix(col, u_color2, smoothstep(0.38, 0.72, flameIntensity));
    col = mix(col, u_color3, smoothstep(0.68, 1.05, flameIntensity));

    // Dynamic Alpha
    float alpha = smoothstep(0.08, 0.6, flameIntensity) * verticalFade * 0.95;

    gl_FragColor = vec4(col, alpha);
  }
`;

export function ShaderBackground({
  color1 = [0.38, 0.12, 0.85], // Saturated Violet/Purple
  color2 = [0.65, 0.18, 0.95], // Electric Violet
  color3 = [0.95, 0.35, 0.88], // Hot Magenta / Glow
  speed = 1.0,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttrLoc);
    gl.vertexAttribPointer(posAttrLoc, 2, gl.FLOAT, false, 0, 0);

    const resUniformLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLoc = gl.getUniformLocation(program, 'u_time');
    const mouseUniformLoc = gl.getUniformLocation(program, 'u_mouse');
    const color1UniformLoc = gl.getUniformLocation(program, 'u_color1');
    const color2UniformLoc = gl.getUniformLocation(program, 'u_color2');
    const color3UniformLoc = gl.getUniformLocation(program, 'u_color3');

    gl.uniform3fv(color1UniformLoc, color1);
    gl.uniform3fv(color2UniformLoc, color2);
    gl.uniform3fv(color3UniformLoc, color3);

    let animationFrameId;
    let startTime = performance.now();
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(rect.width * dpr, 200);
      canvas.height = Math.max(rect.height * dpr, 200);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resUniformLoc, canvas.width, canvas.height);
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      mouse.targetX = (e.clientX - rect.left) * dpr;
      mouse.targetY = (e.clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001 * speed;
      gl.uniform1f(timeUniformLoc, elapsed);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
      gl.uniform2f(mouseUniformLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
    };
  }, [color1, color2, color3, speed]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-[inherit] ${className}`}>
      {/* Deep dark canvas background */}
      <canvas ref={canvasRef} className="w-full h-full block opacity-95 transition-opacity duration-300" />
      {/* Ultra-subtle vignette to keep text 100% crisp while flame boils underneath */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none" />
    </div>
  );
}

export default function ShaderCard({
  children,
  className = '',
  color1 = [0.38, 0.12, 0.85],
  color2 = [0.65, 0.18, 0.95],
  color3 = [0.95, 0.35, 0.88],
  speed = 1.0,
  hoverGlow = true,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950 transition-all duration-300 ${
        isHovered && hoverGlow
          ? 'border-indigo-400/60 shadow-2xl shadow-indigo-950/60 scale-[1.01]'
          : 'shadow-xl'
      } ${className}`}
      {...props}
    >
      <ShaderBackground color1={color1} color2={color2} color3={color3} speed={speed} />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
}
