"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import * as THREE from "three";
import "./ColorBends.css";

type ColorBendsProps = {
  className?: string;
  style?: CSSProperties;
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  iterations?: number;
  intensity?: number;
  bandWidth?: number;
};

const MAX_COLORS = 8;
const fragment = `
#define MAX_COLORS 8
uniform vec2 uCanvas; uniform float uTime; uniform float uSpeed; uniform vec2 uRot;
uniform int uColorCount; uniform vec3 uColors[MAX_COLORS]; uniform int uTransparent;
uniform float uScale; uniform float uFrequency; uniform float uWarpStrength;
uniform vec2 uPointer; uniform float uMouseInfluence; uniform float uParallax;
uniform float uNoise; uniform int uIterations; uniform float uIntensity; uniform float uBandWidth;
varying vec2 vUv;
void main(){
  float t=uTime*uSpeed; vec2 p=vUv*2.0-1.0; p+=uPointer*uParallax*0.1;
  vec2 rp=vec2(p.x*uRot.x-p.y*uRot.y,p.x*uRot.y+p.y*uRot.x);
  vec2 q=vec2(rp.x*(uCanvas.x/uCanvas.y),rp.y); q/=max(uScale,0.0001); q/=0.5+0.2*dot(q,q); q+=0.2*cos(t)-7.56;
  q+=(uPointer-rp)*uMouseInfluence*0.2;
  for(int j=0;j<5;j++){if(j>=uIterations-1)break;vec2 rr=sin(1.5*(q.yx*uFrequency)+2.0*cos(q*uFrequency));q+=(rr-q)*0.15;}
  vec3 col=vec3(0.0); float a=1.0; vec2 s=q; vec3 sumCol=vec3(0.0); float cover=0.0;
  for(int i=0;i<MAX_COLORS;i++){
    if(i>=uColorCount)break; s-=0.01; vec2 r=sin(1.5*(s.yx*uFrequency)+2.0*cos(s*uFrequency));
    float m0=length(r+sin(5.0*r.y*uFrequency-3.0*t+float(i))/4.0); float kBelow=clamp(uWarpStrength,0.0,1.0);
    float gain=1.0+max(uWarpStrength-1.0,0.0); vec2 warped=s+(r-s)*kBelow*gain;
    float m1=length(warped+sin(5.0*warped.y*uFrequency-3.0*t+float(i))/4.0);
    float m=mix(m0,m1,pow(kBelow,0.3)); float w=1.0-exp(-uBandWidth/exp(uBandWidth*m));
    sumCol+=uColors[i]*w; cover=max(cover,w);
  }
  col=clamp(sumCol,0.0,1.0)*uIntensity; a=uTransparent>0?cover:1.0;
  if(uNoise>0.0001){float n=fract(sin(dot(gl_FragCoord.xy+vec2(uTime),vec2(12.9898,78.233)))*43758.5453123);col=clamp(col+(n-0.5)*uNoise,0.0,1.0);}
  vec3 rgb=uTransparent>0?col*a:col; gl_FragColor=vec4(rgb,a);
}`;
const vertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;

export default function ColorBends({
  className = "", style, rotation = 90, speed = 0.2, colors = [], transparent = true,
  autoRotate = 0, scale = 1, frequency = 1, warpStrength = 1, mouseInfluence = 1,
  parallax = 0.5, noise = 0.15, iterations = 1, intensity = 1.5, bandWidth = 6,
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rotationRef = useRef(rotation);
  const autoRotateRef = useRef(autoRotate);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    const geometry = new THREE.PlaneGeometry(2,2);
    const material = new THREE.ShaderMaterial({
      vertexShader:vertex, fragmentShader:fragment, premultipliedAlpha:true, transparent:true,
      uniforms:{
        uCanvas:{value:new THREE.Vector2(1,1)},uTime:{value:0},uSpeed:{value:speed},uRot:{value:new THREE.Vector2(1,0)},
        uColorCount:{value:0},uColors:{value:Array.from({length:MAX_COLORS},()=>new THREE.Vector3())},uTransparent:{value:transparent?1:0},
        uScale:{value:scale},uFrequency:{value:frequency},uWarpStrength:{value:warpStrength},uPointer:{value:new THREE.Vector2()},
        uMouseInfluence:{value:mouseInfluence},uParallax:{value:parallax},uNoise:{value:noise},uIterations:{value:iterations},
        uIntensity:{value:intensity},uBandWidth:{value:bandWidth},
      },
    });
    materialRef.current=material;
    scene.add(new THREE.Mesh(geometry,material));
    let renderer: THREE.WebGLRenderer;
    try { renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:"high-performance",alpha:true}); }
    catch(error){ console.warn("ColorBends: WebGL could not be initialized.",error); return; }
    rendererRef.current=renderer; renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setClearColor(0x000000,transparent?0:1); Object.assign(renderer.domElement.style,{width:"100%",height:"100%",display:"block"});
    renderer.domElement.setAttribute("aria-hidden","true"); container.appendChild(renderer.domElement);
    const clock=new THREE.Clock(); const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??false;
    const resize=()=>{const width=container.clientWidth||1;const height=container.clientHeight||1;renderer.setSize(width,height,false);material.uniforms.uCanvas.value.set(width,height);};
    const observer=new ResizeObserver(resize); observer.observe(container); resize();
    const loop=()=>{const delta=clock.getDelta();const elapsed=clock.elapsedTime;material.uniforms.uTime.value=reduced?0:elapsed;
      const radians=(((rotationRef.current%360)+autoRotateRef.current*elapsed)*Math.PI)/180;material.uniforms.uRot.value.set(Math.cos(radians),Math.sin(radians));
      pointerCurrentRef.current.lerp(pointerTargetRef.current,Math.min(1,delta*8));material.uniforms.uPointer.value.copy(pointerCurrentRef.current);
      renderer.render(scene,camera);rafRef.current=requestAnimationFrame(loop);};
    rafRef.current=requestAnimationFrame(loop);
    return()=>{if(rafRef.current!==null)cancelAnimationFrame(rafRef.current);observer.disconnect();geometry.dispose();material.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
  },[]);

  useEffect(()=>{
    const material=materialRef.current;const renderer=rendererRef.current;if(!material)return;
    rotationRef.current=rotation;autoRotateRef.current=autoRotate;material.uniforms.uSpeed.value=speed;
    material.uniforms.uScale.value=scale;material.uniforms.uFrequency.value=frequency;material.uniforms.uWarpStrength.value=warpStrength;
    material.uniforms.uMouseInfluence.value=mouseInfluence;material.uniforms.uParallax.value=parallax;material.uniforms.uNoise.value=noise;
    material.uniforms.uIterations.value=iterations;material.uniforms.uIntensity.value=intensity;material.uniforms.uBandWidth.value=bandWidth;
    const toVector=(hex:string)=>{const value=hex.replace("#","").trim();const rgb=value.length===3?[parseInt(value[0]+value[0],16),parseInt(value[1]+value[1],16),parseInt(value[2]+value[2],16)]:[parseInt(value.slice(0,2),16),parseInt(value.slice(2,4),16),parseInt(value.slice(4,6),16)];return new THREE.Vector3(rgb[0]/255,rgb[1]/255,rgb[2]/255);};
    const palette=colors.filter(Boolean).slice(0,MAX_COLORS).map(toVector);material.uniforms.uColors.value.forEach((vector:THREE.Vector3,index:number)=>index<palette.length?vector.copy(palette[index]):vector.set(0,0,0));
    material.uniforms.uColorCount.value=palette.length;material.uniforms.uTransparent.value=transparent?1:0;renderer?.setClearColor(0x000000,transparent?0:1);
  },[rotation,autoRotate,speed,scale,frequency,warpStrength,mouseInfluence,parallax,noise,iterations,intensity,bandWidth,colors,transparent]);

  useEffect(()=>{const move=(event:PointerEvent)=>{const container=containerRef.current;if(!container)return;const rect=container.getBoundingClientRect();pointerTargetRef.current.set(((event.clientX-rect.left)/(rect.width||1))*2-1,-(((event.clientY-rect.top)/(rect.height||1))*2-1));};window.addEventListener("pointermove",move,{passive:true});return()=>window.removeEventListener("pointermove",move);},[]);
  return <div ref={containerRef} className={`color-bends-container ${className}`.trim()} style={style} aria-hidden="true" />;
}
