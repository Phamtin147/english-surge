import React, { useRef, useEffect, useState } from 'react';

// GLSL Vertex Shader
const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// GLSL Fragment Shader: Luminous Iridescent Fluid Waves
const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.y = 1.0 - st.y;

    // Interactive mouse ripples
    vec2 mouse = u_mouse / u_resolution.xy;
    float distToMouse = distance(st, mouse);
    float mouseWave = sin(distToMouse * 16.0 - u_time * 3.0) * exp(-distToMouse * 3.0);

    // Flowing liquid noise layers
    float n1 = snoise(st * 2.2 + vec2(u_time * 0.2, u_time * 0.12));
    float n2 = snoise(st * 3.6 - vec2(u_time * 0.15, -u_time * 0.18) + vec2(n1 * 0.7));
    float wave = (n1 * 0.6 + n2 * 0.4) + mouseWave * 0.45;

    // Color gradient mixing
    float t1 = smoothstep(-0.5, 0.5, wave);
    float t2 = smoothstep(-0.3, 0.7, sin(wave * 3.1415 + u_time * 0.4));

    vec3 col = mix(u_color1, u_color2, t1);
    col = mix(col, u_color3, t2 * 0.8);

    // Glowing brightness
    float brightness = 0.6 + 0.4 * t1 + 0.25 * exp(-distToMouse * 2.5);
    gl_FragColor = vec4(col * brightness, 0.85);
  }
`;

export function ShaderBackground({
  color1 = [0.35, 0.15, 0.85], // Vibrant Indigo/Purple
  color2 = [0.0, 0.8, 0.95],   // Vibrant Cyan
  color3 = [0.8, 0.1, 0.6],    // Vibrant Magenta
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
      canvas.width = (rect.width || 300) * dpr;
      canvas.height = (rect.height || 200) * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resUniformLoc, canvas.width, canvas.height);
    };

    resize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
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

      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
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
      <canvas ref={canvasRef} className="w-full h-full block opacity-70 transition-opacity duration-300" />
      {/* Light frosted glass tint to ensure text contrast while keeping fluid waves completely visible */}
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]" />
    </div>
  );
}

export default function ShaderCard({
  children,
  className = '',
  color1 = [0.35, 0.15, 0.85],
  color2 = [0.0, 0.8, 0.95],
  color3 = [0.8, 0.1, 0.6],
  speed = 1.0,
  hoverGlow = true,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
        isHovered && hoverGlow
          ? 'border-indigo-400/60 shadow-2xl shadow-indigo-900/50 scale-[1.01]'
          : 'border-slate-800/90 shadow-xl'
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
