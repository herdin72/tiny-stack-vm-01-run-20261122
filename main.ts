import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",E=new TextEncoder;
const V=o=>o<8||o>15&&o<35&&o!=31||o>47&&o<53||o>63&&o<66||o>79&&o<84;
const L=o=>o==1?1:o==2?4:o>47&&o<52?2:0;
const P=o=>o<8?o==3||o==4?1:o==5||o==6?2:o==7?3:0:o<35?o==23||o==27?1:2:o<53?o==49||o==50?1:0:o==64?1:o==65?2:o==80||o==81||o==83?1:0;
const Q=o=>o<8?o==1||o==2?1:o==4||o==5?2:o==6||o==7?3:0:o<35?1:o==64||o==82?1:0;
function R(p,u){
const s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536);
let a=0,b=0,d=0,e=0,f=0,g=0;
const h=x=>({o:o.slice(0,f),c:x});
for(;;){
if(g==1e6)return h(10);
if(d<0||d>=p.length)return h(9);
const k=p[d];
if(!V(k))return h(5);
const l=L(k);
if(d+l>=p.length)return h(9);
g++;
const n=d+1+l,w=P(k),v=Q(k);
if(a<w)return h(2);
if(a-w+v>256)return h(3);
d=n;
if(k==0)return h(0);
if(k==1){s[a++]=(p[n-1]<<24)>>24;continue}
if(k==2){s[a++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;continue}
if(k==3){a--;continue}
if(k==4){s[a]=s[a-1];a++;continue}
if(k==5){const t=s[a-1];s[a-1]=s[a-2];s[a-2]=t;continue}
if(k==6){s[a]=s[a-2];a++;continue}
if(k==7){const t=s[a-3];s[a-3]=s[a-2];s[a-2]=s[a-1];s[a-1]=t;continue}
if(k==23){s[a-1]=-s[a-1]|0;continue}
if(k==27){s[a-1]=~s[a-1];continue}
if(k>15&&k<35){
const y=s[a-1],x=s[a-2];let r;
if(k==16)r=x+y|0;
else if(k==17)r=x-y|0;
else if(k==18)r=Math.imul(x,y);
else if(k==19){if(!y)return h(4);r=x==-2147483648&&y==-1?x:x/y|0}
else if(k==20){if(!y)return h(4);r=y==-1?0:x%y|0}
else if(k==21){if(!y)return h(4);r=Math.floor((x>>>0)/(y>>>0))|0}
else if(k==22){if(!y)return h(4);r=(x>>>0)%(y>>>0)|0}
else if(k==24)r=x&y;
else if(k==25)r=x|y;
else if(k==26)r=x^y;
else if(k==28)r=x<<(y&31);
else if(k==29)r=x>>(y&31);
else if(k==30)r=(x>>>(y&31))|0;
else if(k==32)r=x==y?1:0;
else if(k==33)r=x<y?1:0;
else r=(x>>>0)<(y>>>0)?1:0;
a-=2;s[a++]=r;continue}
if(k>47&&k<51){
const t=(p[n-2]|p[n-1]<<8)<<16>>16;
let j=k==48;
if(!j){const z=s[--a];j=k==49?z==0:z!=0}
if(j)d=n+t;
continue}
if(k==51){if(b==64)return h(7);c[b++]=n;d=p[n-2]|p[n-1]<<8;continue}
if(k==52){if(!b)return h(8);d=c[--b];continue}
if(k==64){const z=s[a-1];if(z<0||z>255)return h(6);s[a-1]=m[z];continue}
if(k==65){const z=s[a-1];if(z<0||z>255)return h(6);m[z]=s[a-2];a-=2;continue}
if(k==80){const z=E.encode(String(s[a-1]));if(f+z.length>65536)return h(11);a--;o.set(z,f);f+=z.length;continue}
if(k==81){if(f+1>65536)return h(11);o[f++]=s[--a]&255;continue}
if(k==82){s[a++]=e<u.length?u[e++]:-1;continue}
return h(s[--a]&255);
}}
for(const id of readdirSync(I).sort()){
const r=R(readFileSync(join(I,id,"program.bin")),readFileSync(join(I,id,"input.bin")));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,"stdout.bin"),r.o);
writeFileSync(join(O,id,"exit.txt"),r.c+"\n");
}
