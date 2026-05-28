import { useState, useRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const MBTI_COLORS={INTJ:"#7c3aed",INTP:"#6d28d9",ENTJ:"#5b21b6",ENTP:"#8b5cf6",INFJ:"#059669",INFP:"#10b981",ENFJ:"#047857",ENFP:"#34d399",ISTJ:"#d97706",ISFJ:"#f59e0b",ESTJ:"#b45309",ESFJ:"#fbbf24",ISTP:"#dc2626",ISFP:"#ef4444",ESTP:"#b91c1c",ESFP:"#f87171"};
const MBTI_GROUP={INTJ:"Analyst",INTP:"Analyst",ENTJ:"Analyst",ENTP:"Analyst",INFJ:"Diplomat",INFP:"Diplomat",ENFJ:"Diplomat",ENFP:"Diplomat",ISTJ:"Sentinel",ISFJ:"Sentinel",ESTJ:"Sentinel",ESFJ:"Sentinel",ISTP:"Explorer",ISFP:"Explorer",ESTP:"Explorer",ESFP:"Explorer"};

// ── SECTION ILLUSTRATIONS ────────────────────────────────────────────────────

const AnalystBG = ({c}) => (
  <svg viewBox="0 0 900 320" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="ag" cx="70%" cy="30%" r="50%"><stop offset="0%" stopColor={c} stopOpacity=".18"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
    <rect width="900" height="320" fill="url(#ag)"/>
    {/* Floating formulas */}
    {[["∑",60,80,28,-12],["π",780,60,24,8],["∫f(x)dx",680,200,16,-5],["E=mc²",80,220,14,10],["∞",820,220,22,0],["∂/∂x",200,140,18,-8]].map(([t,x,y,s,r],i)=>(
      <text key={i} x={x} y={y} fontFamily="Georgia,serif" fontSize={s} fill={c} opacity=".13" transform={`rotate(${r},${x},${y})`}>{t}</text>
    ))}
    {/* Neural network */}
    {[[150,60],[200,100],[170,150],[230,130],[280,80],[260,160]].map(([x,y],i,arr)=>(
      arr.slice(i+1,i+3).map((p,j)=><line key={`${i}-${j}`} x1={x} y1={y} x2={p[0]} y2={p[1]} stroke={c} strokeWidth=".8" opacity=".12"/>)
    ))}
    {[[150,60],[200,100],[170,150],[230,130],[280,80],[260,160]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={c} opacity=".18"/>)}
    {/* Geometric shapes */}
    <polygon points="700,40 730,90 670,90" fill="none" stroke={c} strokeWidth="1.2" opacity=".12"/>
    <circle cx="820" cy="140" r="35" fill="none" stroke={c} strokeWidth="1" opacity=".1"/>
    <circle cx="820" cy="140" r="22" fill="none" stroke={c} strokeWidth=".6" opacity=".08"/>
    <rect x="60" y="240" width="40" height="40" rx="4" fill="none" stroke={c} strokeWidth="1" opacity=".1" transform="rotate(20,80,260)"/>
    {/* Stars */}
    {[[400,40],[500,80],[600,30],[350,120],[650,110],[750,50]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%2===0?1.5:2} fill="white" opacity=".15"/>)}
    {/* Desk silhouette faint */}
    <rect x="550" y="220" width="280" height="6" rx="3" fill={c} opacity=".08"/>
    <rect x="600" y="226" width="8" height="50" rx="2" fill={c} opacity=".06"/>
    <rect x="790" y="226" width="8" height="50" rx="2" fill={c} opacity=".06"/>
    <rect x="620" y="180" width="100" height="40" rx="4" fill="none" stroke={c} strokeWidth="1" opacity=".07"/>
  </svg>
);

const DiplomatBG = ({c}) => (
  <svg viewBox="0 0 900 320" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="dg" cx="30%" cy="40%" r="60%"><stop offset="0%" stopColor={c} stopOpacity=".15"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
    <rect width="900" height="320" fill="url(#dg)"/>
    {/* Moon */}
    <circle cx="780" cy="70" r="38" fill={c} opacity=".08"/>
    <circle cx="798" cy="58" r="32" fill="#09090f" opacity=".7"/>
    {/* Stars */}
    {[[100,50],[200,30],[350,60],[480,25],[620,55],[720,30],[850,70],[150,120],[420,100],[680,90]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="white" opacity={i%3===0?".2":".12"}/>
    ))}
    {/* Rolling hills */}
    <path d="M0,220 Q100,160 200,200 Q300,240 400,180 Q500,120 600,180 Q700,240 800,200 Q850,180 900,200 L900,320 L0,320 Z" fill={c} opacity=".07"/>
    <path d="M0,260 Q150,220 300,240 Q450,260 600,230 Q750,200 900,240 L900,320 L0,320 Z" fill={c} opacity=".06"/>
    {/* Flowers */}
    {[[120,250],[250,240],[380,255],[650,245],[750,255],[850,250]].map(([x,y],i)=>(
      <g key={i} opacity=".18">
        <line x1={x} y1={y} x2={x} y2={y+18} stroke={c} strokeWidth="1.5"/>
        {[0,72,144,216,288].map(a=><circle key={a} cx={x+6*Math.cos(a*Math.PI/180)} cy={y+6*Math.sin(a*Math.PI/180)} r="4" fill={["#f9a8d4","#fde68a",c,"#c4b5fd"][i%4]}/>)}
        <circle cx={x} cy={y} r="3" fill="white"/>
      </g>
    ))}
    {/* Butterfly */}
    <path d="M450,130 Q465,118 480,130 Q465,142 450,130" fill={c} opacity=".14"/>
    <path d="M480,130 Q495,118 510,130 Q495,142 480,130" fill={c} opacity=".12"/>
    <circle cx="480" cy="130" r="2" fill={c} opacity=".2"/>
    {/* Birds */}
    <path d="M300,80 Q312,74 320,80" stroke="white" strokeWidth="1.2" fill="none" opacity=".15"/>
    <path d="M330,68 Q342,62 350,68" stroke="white" strokeWidth="1.2" fill="none" opacity=".12"/>
    {/* Tree silhouette */}
    <rect x="55" y="150" width="12" height="120" rx="3" fill={c} opacity=".1"/>
    <ellipse cx="61" cy="145" rx="40" ry="55" fill={c} opacity=".08"/>
    <ellipse cx="61" cy="125" rx="30" ry="42" fill={c} opacity=".07"/>
  </svg>
);

const SentinelBG = ({c}) => (
  <svg viewBox="0 0 900 320" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="sg" cx="50%" cy="20%" r="60%"><stop offset="0%" stopColor={c} stopOpacity=".2"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
    <rect width="900" height="320" fill="url(#sg)"/>
    {/* Bookshelf silhouette */}
    <rect x="60" y="60" width="120" height="220" rx="4" fill="none" stroke={c} strokeWidth="1" opacity=".1"/>
    <line x1="60" y1="130" x2="180" y2="130" stroke={c} strokeWidth=".8" opacity=".08"/>
    <line x1="60" y1="200" x2="180" y2="200" stroke={c} strokeWidth=".8" opacity=".08"/>
    {[[68,68,10,58],[80,72,14,54],[96,66,12,60],[110,70,16,56],[128,68,11,58]].map(([x,y,w,h],i)=>(
      <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={[c,"#db2777","#0891b2","#059669","#f59e0b"][i]} opacity=".12"/>
    ))}
    {/* Window with light */}
    <rect x="720" y="50" width="140" height="180" rx="4" fill={c} opacity=".05" stroke={c} strokeWidth="1" opacity=".1"/>
    <line x1="790" y1="50" x2="790" y2="230" stroke={c} strokeWidth=".8" opacity=".08"/>
    <line x1="720" y1="140" x2="860" y2="140" stroke={c} strokeWidth=".8" opacity=".08"/>
    {/* Light rays from window */}
    {[0,1,2,3,4].map(i=>(
      <line key={i} x1={790} y1={140} x2={790-120+i*40} y2={300} stroke={c} strokeWidth="12" opacity=".03"/>
    ))}
    {/* Clock */}
    <circle cx="450" cy="80" r="28" fill="none" stroke={c} strokeWidth="1" opacity=".1"/>
    <line x1="450" y1="80" x2="450" y2="58" stroke={c} strokeWidth="1.5" opacity=".12"/>
    <line x1="450" y1="80" x2="468" y2="88" stroke={c} strokeWidth="1" opacity=".1"/>
    {/* Calendar dots */}
    {[[500,120],[520,120],[540,120],[560,120],[500,140],[520,140],[540,140]].map(([x,y],i)=>(
      <rect key={i} x={x-8} y={y-8} width="14" height="14" rx="3" fill={c} opacity=".08"/>
    ))}
    {/* Plant pot */}
    <path d="M820,240 Q820,210 840,200 Q860,190 860,200 Q880,210 880,240 Z" fill={c} opacity=".08"/>
    <rect x="822" y="240" width="56" height="18" rx="4" fill={c} opacity=".08"/>
    {/* Checklist items */}
    {[[260,160],[260,185],[260,210]].map(([x,y],i)=>(
      <g key={i} opacity=".1"><rect x={x} y={y} width="14" height="14" rx="3" fill="none" stroke={c} strokeWidth="1"/>
        {i<2&&<path d={`M${x+3},${y+7} L${x+6},${y+10} L${x+11},${y+4}`} stroke={c} strokeWidth="1.5" fill="none"/>}
        <rect x={x+20} y={y+3} width={[80,65,72][i]} height="6" rx="3" fill={c}/>
      </g>
    ))}
  </svg>
);

const ExplorerBG = ({c}) => (
  <svg viewBox="0 0 900 320" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="eg" cx="20%" cy="30%" r="60%"><stop offset="0%" stopColor={c} stopOpacity=".18"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
    <rect width="900" height="320" fill="url(#eg)"/>
    {/* Mountains */}
    <polygon points="0,320 0,180 140,60 280,180 280,320" fill={c} opacity=".06"/>
    <polygon points="150,320 150,200 300,80 450,200 450,320" fill={c} opacity=".07"/>
    <polygon points="400,320 400,220 530,110 660,220 660,320" fill={c} opacity=".05"/>
    <polygon points="620,320 620,240 730,150 840,240 900,220 900,320" fill={c} opacity=".06"/>
    {/* Snow caps */}
    <polygon points="140,60 115,105 165,105" fill="white" opacity=".08"/>
    <polygon points="300,80 275,122 325,122" fill="white" opacity=".07"/>
    <polygon points="530,110 508,148 552,148" fill="white" opacity=".06"/>
    {/* Stars */}
    {[[200,45],[340,25],[500,55],[650,35],[760,60],[100,80]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%2?1.5:2} fill="white" opacity=".15"/>)}
    {/* Moon */}
    <circle cx="820" cy="65" r="30" fill={c} opacity=".1"/>
    <circle cx="835" cy="55" r="25" fill="#09090f" opacity=".8"/>
    {/* Path dashes */}
    <path d="M200,310 Q350,270 450,240 Q550,210 680,260 Q750,285 820,300" stroke={c} strokeWidth="2" fill="none" strokeDasharray="10,6" opacity=".12"/>
    {/* Compass rose */}
    <circle cx="750" cy="180" r="30" fill="none" stroke={c} strokeWidth="1" opacity=".12"/>
    <circle cx="750" cy="180" r="20" fill="none" stroke={c} strokeWidth=".6" opacity=".1"/>
    <polygon points="750,155 746,178 750,172 754,178" fill={c} opacity=".2"/>
    <polygon points="750,205 746,182 750,188 754,182" fill="#dc2626" opacity=".18"/>
    <line x1="725" y1="180" x2="775" y2="180" stroke={c} strokeWidth="1" opacity=".1"/>
    {/* Pine trees */}
    {[[55,240],[90,230],[820,235],[855,245]].map(([x,y],i)=>(
      <g key={i} opacity=".12">
        <polygon points={`${x},${y} ${x-18},${y+40} ${x+18},${y+40}`} fill={c}/>
        <polygon points={`${x},${y+15} ${x-15},${y+50} ${x+15},${y+50}`} fill={c}/>
        <rect x={x-4} y={y+50} width="8" height="15" rx="2" fill={c}/>
      </g>
    ))}
    {/* Birds */}
    <path d="M380,90 Q393,84 402,90" stroke="white" strokeWidth="1.2" fill="none" opacity=".14"/>
    <path d="M412,78 Q425,72 434,78" stroke="white" strokeWidth="1.2" fill="none" opacity=".12"/>
  </svg>
);

const MoodBG = ({moodData, c}) => {
  const avg = moodData?.length ? moodData.reduce((s,m)=>s+m.score,0)/moodData.length : 50;
  const skyC = avg>65?"#1e3a5f":avg>40?"#1a2a4a":"#1a1030";
  return (
    <svg viewBox="0 0 900 360" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="moon" cx="80%" cy="15%" r="25%"><stop offset="0%" stopColor={avg>65?"#fbbf24":"#c4b5fd"} stopOpacity={avg>65?".2":".15"}/><stop offset="100%" stopColor="transparent"/></radialGradient>
        <linearGradient id="msky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={skyC} stopOpacity=".4"/><stop offset="100%" stopColor="transparent"/></linearGradient>
      </defs>
      <rect width="900" height="360" fill="url(#msky)"/>
      <rect width="900" height="360" fill="url(#moon)"/>
      {/* Celestial body */}
      {avg>65?(
        <>
          <circle cx="750" cy="65" r="40" fill="#fbbf24" opacity=".1"/>
          <circle cx="750" cy="65" r="26" fill="#fbbf24" opacity=".08"/>
          {[0,45,90,135,180,225,270,315].map(a=><line key={a} x1={750+32*Math.cos(a*Math.PI/180)} y1={65+32*Math.sin(a*Math.PI/180)} x2={750+44*Math.cos(a*Math.PI/180)} y2={65+44*Math.sin(a*Math.PI/180)} stroke="#fbbf24" strokeWidth="2" opacity=".08"/>)}
        </>
      ):(
        <>
          <circle cx="750" cy="65" r="32" fill={c} opacity=".1"/>
          <circle cx="766" cy="55" r="26" fill="#09090f" opacity=".9"/>
        </>
      )}
      {/* Stars - more if low mood, fewer if high */}
      {Array.from({length:avg>65?8:16},(_,i)=>[100+i*70+Math.sin(i)*30, 30+Math.cos(i*1.3)*40]).map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?2:1.2} fill="white" opacity={avg>65?".1":".18"}/>
      ))}
      {/* Landscape */}
      {avg>65?(
        <>
          <path d="M0,260 Q120,200 240,230 Q360,260 480,210 Q600,160 720,210 Q810,245 900,230 L900,360 L0,360 Z" fill={c} opacity=".07"/>
          <path d="M0,290 Q150,255 300,270 Q450,285 600,260 Q750,235 900,265 L900,360 L0,360 Z" fill={c} opacity=".06"/>
        </>
      ):(
        <>
          <path d="M0,200 Q80,140 180,170 Q280,200 360,150 Q440,100 540,160 Q640,220 740,180 Q820,145 900,170 L900,360 L0,360 Z" fill={c} opacity=".09"/>
          <path d="M-20,240 Q60,180 160,220 Q260,260 400,200 Q540,140 660,200 Q780,255 900,230 L900,360 L0,360 Z" fill={c} opacity=".07"/>
          {/* Stormy clouds */}
          {[[150,120],[400,90],[650,110]].map(([x,y],i)=>(
            <g key={i}><ellipse cx={x} cy={y} rx="70" ry="25" fill="white" opacity=".04"/>
              <ellipse cx={x+20} cy={y-8} rx="55" ry="22" fill="white" opacity=".03"/>
            </g>
          ))}
        </>
      )}
      {/* Rain if low mood */}
      {avg<40&&Array.from({length:20},(_,i)=>({x:i*45+10,y:160+i%5*20})).map((p,i)=>(
        <line key={i} x1={p.x} y1={p.y} x2={p.x-4} y2={p.y+16} stroke={c} strokeWidth="1" opacity=".07"/>
      ))}
      {/* Graph echo */}
      {moodData&&moodData.length>1&&(
        <polyline points={moodData.map((m,i)=>`${60+i*(780/(moodData.length-1))},${280-m.score*1.2}`).join(" ")} fill="none" stroke={c} strokeWidth="1.5" opacity=".15" strokeDasharray="6 3"/>
      )}
    </svg>
  );
};

const TopicsBG = ({topics}) => (
  <svg viewBox="0 0 900 280" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    {/* Topic emoji as large faint bg elements */}
    {(topics||[]).map((t,i)=>{
      const positions=[[80,100],[820,80],[150,200],[750,200],[450,50],[300,220],[600,220],[50,240],[850,240]];
      const sizes=[110,90,80,70,100,75,65,60,55];
      const [x,y]=positions[i]||[400+i*60,140];
      return <text key={i} x={x} y={y} fontSize={sizes[i]||60} textAnchor="middle" dominantBaseline="central" opacity=".07" style={{userSelect:"none"}}>{t.emoji}</text>;
    })}
    {/* Connection lines between topic positions */}
    {(topics||[]).slice(0,4).map((_,i,arr)=>arr.slice(i+1,i+2).map((b,j)=>{
      const pos=[[80,100],[820,80],[150,200],[750,200]];
      return <line key={`${i}-${j}`} x1={pos[i][0]} y1={pos[i][1]} x2={pos[i+1][0]} y2={pos[i+1][1]} stroke="white" strokeWidth=".5" opacity=".04"/>;
    }))}
    {/* Scattered small dots */}
    {Array.from({length:20},(_,i)=>[50+i*40+Math.sin(i)*20, 50+Math.cos(i*0.8)*80+100]).map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity=".06"/>
    ))}
  </svg>
);

const MindBG = ({personality, c}) => {
  const traits=["openness","conscientiousness","extraversion","agreeableness","neuroticism"];
  const colors=["#7c3aed","#db2777","#0891b2","#059669","#ea580c"];
  return (
    <svg viewBox="0 0 900 300" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
      {/* Central mind orb */}
      <circle cx="450" cy="150" r="60" fill="none" stroke={c} strokeWidth="1" opacity=".1"/>
      <circle cx="450" cy="150" r="40" fill={c} opacity=".04"/>
      <circle cx="450" cy="150" r="20" fill={c} opacity=".06"/>
      {/* Trait nodes radiating out */}
      {traits.map((tr,i)=>{
        const angle=(i/5)*2*Math.PI-Math.PI/2;
        const val=(personality?.[tr]||50)/100;
        const dist=90+val*60;
        const nx=450+dist*Math.cos(angle);
        const ny=150+dist*Math.sin(angle);
        const r=4+val*10;
        return (
          <g key={tr}>
            <line x1="450" y1="150" x2={nx} y2={ny} stroke={colors[i]} strokeWidth={val*2+0.5} opacity=".12"/>
            <circle cx={nx} cy={ny} r={r} fill={colors[i]} opacity=".15"/>
            <circle cx={nx} cy={ny} r={r*1.8} fill={colors[i]} opacity=".05"/>
          </g>
        );
      })}
      {/* Orbiting particles */}
      {Array.from({length:12},(_,i)=>{
        const a=(i/12)*2*Math.PI; const r=80+Math.sin(i)*15;
        return <circle key={i} cx={450+r*Math.cos(a)} cy={150+r*Math.sin(a)} r="2" fill="white" opacity=".08"/>;
      })}
      {/* Outer ring */}
      <circle cx="450" cy="150" r="140" fill="none" stroke="white" strokeWidth=".5" opacity=".05" strokeDasharray="4 8"/>
      {/* Scattered synapses */}
      {[[100,80],[780,80],[120,230],[800,230],[200,50],[700,50]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="3" fill={c} opacity=".1"/>
          <line x1={x} y1={y} x2="450" y2="150" stroke={c} strokeWidth=".5" opacity=".05"/>
        </g>
      ))}
    </svg>
  );
};

const TechBG = ({c}) => (
  <svg viewBox="0 0 900 260" style={{width:"100%",height:"100%",position:"absolute",inset:0}} preserveAspectRatio="xMidYMid slice">
    {/* Circuit board traces */}
    {[[50,60],[150,60],[150,130],[300,130],[300,60],[450,60],[450,180],[600,180],[600,80],[750,80],[750,200],[850,200]].reduce((acc,p,i,arr)=>{
      if(i>0)acc.push(<line key={i} x1={arr[i-1][0]} y1={arr[i-1][1]} x2={p[0]} y2={p[1]} stroke={c} strokeWidth="1.2" opacity=".1"/>);
      return acc;
    },[])}
    {[[50,60],[150,60],[150,130],[300,130],[300,60],[450,60],[450,180],[600,180],[600,80],[750,80],[750,200],[850,200]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="4" fill={c} opacity=".14"/>
    ))}
    {/* Second circuit path */}
    {[[80,200],[200,200],[200,100],[350,100],[350,220],[500,220],[500,100],[650,100],[650,230],[820,230]].reduce((acc,p,i,arr)=>{
      if(i>0)acc.push(<line key={i} x1={arr[i-1][0]} y1={arr[i-1][1]} x2={p[0]} y2={p[1]} stroke={c} strokeWidth=".8" opacity=".07"/>);
      return acc;
    },[])}
    {/* Data flow dots */}
    {[[200,60],[450,130],[700,80],[300,200],[600,200]].map(([x,y],i)=>(
      <g key={i}><circle cx={x} cy={y} r="8" fill={c} opacity=".06"/>
        <circle cx={x} cy={y} r="14" fill="none" stroke={c} strokeWidth=".8" opacity=".08"/>
      </g>
    ))}
    {/* CPU grid */}
    <rect x="380" y="80" width="80" height="80" rx="6" fill="none" stroke={c} strokeWidth="1" opacity=".1"/>
    {[395,415,435,448,435,415,395].map((x,i)=><line key={i} x1={x} y1={80} x2={x} y2={70} stroke={c} strokeWidth="1" opacity=".1"/>)}
    {/* Binary rain */}
    {Array.from({length:15},(_,i)=>[30+i*58, 20+Math.sin(i)*15]).map(([x,y],i)=>(
      <text key={i} x={x} y={y} fontSize="9" fill={c} opacity=".07" fontFamily="monospace">{i%2===0?"10":"01"}</text>
    ))}
  </svg>
);

const SceneBG = ({mbti,c}) => {
  const g=MBTI_GROUP[mbti];
  if(g==="Diplomat") return <DiplomatBG c={c}/>;
  if(g==="Sentinel") return <SentinelBG c={c}/>;
  if(g==="Explorer") return <ExplorerBG c={c}/>;
  return <AnalystBG c={c}/>;
};

// ── PARSING & API ────────────────────────────────────────────────────────────
const extractMsgs=convs=>{const msgs=[];for(const c of convs){for(const m of(c.chat_messages||c.messages||[])){const isUser=m.sender==="human"||m.role==="user";if(!isUser)continue;let t="";if(typeof m.text==="string")t=m.text;else if(typeof m.content==="string")t=m.content;else if(Array.isArray(m.content))t=m.content.filter(x=>x.type==="text").map(x=>x.text||"").join(" ");t=t.trim();if(t.length<10)continue;const raw=m.created_at||m.timestamp||c.created_at;const ts=typeof raw==="number"?raw:new Date(raw).getTime()/1000;if(!isNaN(ts))msgs.push({text:t.slice(0,200),time:ts});}}return msgs;};
const parseClaude=raw=>{let c=[];try{const p=JSON.parse(raw);c=Array.isArray(p)?p:[p];}catch{const ls=raw.trim().split("\n").filter(l=>l.trim().startsWith("{"));for(const l of ls){try{c.push(JSON.parse(l));}catch{}}}return extractMsgs(c).sort((a,b)=>a.time-b.time);};
const parseChatGPT=data=>{const m=[];for(const c of(Array.isArray(data)?data:[data])){if(!c.mapping)continue;for(const k of Object.keys(c.mapping)){const n=c.mapping[k];if(n?.message?.author?.role==="user"){const p=n.message.content?.parts;if(!p)continue;const t=p.filter(x=>typeof x==="string").join(" ").trim();const ts=n.message.create_time;if(t.length>15&&ts)m.push({text:t.slice(0,200),time:ts});}}}return m.sort((a,b)=>a.time-b.time);};

const card=(extra={})=>({background:"rgba(14,14,22,0.75)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"1.25rem",padding:"1.4rem",position:"relative",zIndex:1,...extra});
const lbl={color:"#94a3b8",fontSize:"0.68rem",textTransform:"uppercase",letterSpacing:"0.12em",margin:"0 0 0.6rem",display:"block"};
const PAGE={minHeight:"100vh",fontFamily:"'Inter',system-ui,sans-serif",color:"#e2e8f0",background:"#09090f"};
const GRAD="radial-gradient(ellipse 70% 50% at 5% 0%, rgba(124,58,237,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 95% 100%, rgba(219,39,119,0.14) 0%, transparent 55%)";

export default function App(){
  const[stage,setStage]=useState("upload");
  const[analysis,setAnalysis]=useState(null);
  const[error,setError]=useState(null);
  const[progress,setProgress]=useState("");
  const[msgCount,setMsgCount]=useState(0);
  const[dragging,setDragging]=useState(false);
  const[source,setSource]=useState("claude");
  const inputRef=useRef();

  const callClaude=async msgs=>{
    const byMonth={};
    for(const m of msgs){const d=new Date(m.time*1000);const k=`${d.toLocaleString("default",{month:"short"})} ${d.getFullYear()}`;if(!byMonth[k])byMonth[k]=[];byMonth[k].push(m.text.slice(0,60));}
    const monthStr=Object.entries(byMonth).map(([mo,ms])=>`[${mo} — ${ms.length} msgs]\n${ms.slice(0,40).join("\n")}`).join("\n\n");
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-5",max_tokens:1500,messages:[{role:"user",content:`Psychologist analysing someone's full AI chat history. Return ONLY compact JSON.
insights: personality traits, cognitive style, blind spots. NO topic refs. Start with emoji.
aiAdvice: specific personalised tips. Start with emoji.
mbti: determine the MOST LIKELY 4-letter MBTI based on how they think and communicate — be consistent, don't guess randomly.

${monthStr}

JSON:{"personality":{"openness":0-100,"conscientiousness":0-100,"extraversion":0-100,"agreeableness":0-100,"neuroticism":0-100,"summary":"2 vivid sentences"},"mbti":"4-letter","mbtiReason":"one sharp sentence","moodByMonth":[{"month":"MMM YY","score":0-100,"label":"word","desc":"4 words"}],"topTopics":[{"topic":"name","emoji":"e"},{"topic":"name","emoji":"e"},{"topic":"name","emoji":"e"},{"topic":"name","emoji":"e"},{"topic":"name","emoji":"e"}],"insights":["emoji insight","emoji insight","emoji insight","emoji insight"],"dominantEmotion":"word","askingStyle":"one sentence","aiAdvice":["emoji tip","emoji tip","emoji tip"]}`}]})});
    const d=await res.json();
    if(d.error)throw new Error(`API: ${d.error.message}`);
    const t=d.content?.[0]?.text;
    if(!t)throw new Error(`Empty. Stop: ${d.stop_reason||"?"}`);
    return JSON.parse(t.replace(/```json|```/g,"").trim());
  };

  const process=async file=>{
    setError(null);setStage("analyzing");setProgress("Reading file...");
    try{
      const raw=await file.text();setProgress("Parsing...");
      let msgs=[];
      if(file.name.endsWith(".jsonl")||source==="claude"){msgs=parseClaude(raw);if(!msgs.length)try{msgs=parseChatGPT(JSON.parse(raw));}catch{}}
      else{msgs=parseChatGPT(JSON.parse(raw));if(!msgs.length)msgs=parseClaude(raw);}
      setMsgCount(msgs.length);
      if(!msgs.length)throw new Error("No messages found.");
      setProgress(`Analysing ${msgs.length} messages...`);
      setAnalysis(await callClaude(msgs));setStage("results");
    }catch(e){setError(e.message);setStage("upload");}
  };

  const onFile=e=>{if(e.target.files[0])process(e.target.files[0]);};
  const onDrop=e=>{e.preventDefault();setDragging(false);if(e.dataTransfer.files[0])process(e.dataTransfer.files[0]);};
  const tabs=[{id:"claude",label:"Claude.ai",file:"conversations.jsonl",steps:["Settings → Account → Export Data","Email in minutes → download ZIP","Unzip → upload conversations.jsonl"]},{id:"chatgpt",label:"ChatGPT",file:"conversations.json",steps:["Settings → Data Controls → Export Data","Wait for email → download ZIP","Unzip → upload conversations.json"]}];
  const active=tabs.find(t=>t.id===source);

  if(stage==="upload")return(
    <div style={{...PAGE,backgroundImage:GRAD,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{textAlign:"center",marginBottom:"2rem",zIndex:1}}>
        <div style={{fontSize:"2.5rem",marginBottom:"0.5rem"}}>🪞</div>
        <h1 style={{fontSize:"2rem",fontWeight:800,margin:"0 0 0.4rem",background:"linear-gradient(135deg,#7c3aed,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",paddingBottom:"6px",display:"inline-block"}}>AI Mirror</h1>
        <p style={{color:"#4a4a6a",fontSize:"0.95rem",margin:0}}>Upload your chat history. Discover what it reveals about you.</p>
      </div>
      <div style={{...card(),width:"100%",maxWidth:"440px"}}>
        <div style={{display:"flex",gap:"0.4rem",marginBottom:"1.25rem",background:"rgba(0,0,0,0.3)",borderRadius:"0.75rem",padding:"0.25rem"}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setSource(t.id)} style={{flex:1,padding:"0.5rem",borderRadius:"0.6rem",border:"none",cursor:"pointer",fontWeight:600,fontSize:"0.85rem",transition:"all 0.15s",background:source===t.id?"#7c3aed":"transparent",color:source===t.id?"#fff":"#4a4a6a"}}>{t.label}</button>)}
        </div>
        <span style={lbl}>How to export</span>
        {active.steps.map((s,i)=>(
          <div key={i} style={{display:"flex",gap:"0.6rem",alignItems:"center",marginBottom:"0.5rem"}}>
            <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"#7c3aed20",border:"1px solid #7c3aed40",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",color:"#7c3aed",flexShrink:0,fontWeight:700}}>{i+1}</div>
            <span style={{color:"#64748b",fontSize:"0.84rem"}}>{s}</span>
          </div>
        ))}
        <div onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={onDrop} onClick={()=>inputRef.current.click()}
          style={{marginTop:"1rem",border:`2px dashed ${dragging?"#7c3aed":"rgba(255,255,255,0.08)"}`,borderRadius:"1rem",padding:"1.75rem",textAlign:"center",cursor:"pointer",transition:"all 0.2s",background:dragging?"#7c3aed08":"transparent"}}>
          <input ref={inputRef} type="file" accept=".json,.jsonl" onChange={onFile} style={{display:"none"}}/>
          <div style={{fontSize:"1.6rem",marginBottom:"0.4rem"}}>📁</div>
          <div style={{color:"#7c3aed",fontWeight:600,fontSize:"0.9rem",marginBottom:"0.2rem"}}>Drop {active.file} here</div>
          <div style={{color:"#4a4a6a",fontSize:"0.75rem"}}>or click to browse · stays in your browser</div>
        </div>
        {error&&<div style={{marginTop:"1rem",color:"#f87171",fontSize:"0.82rem",background:"#f8717112",padding:"0.75rem",borderRadius:"0.75rem",lineHeight:1.5}}>{error}</div>}
      </div>
    </div>
  );

  if(stage==="analyzing")return(
    <div style={{...PAGE,backgroundImage:GRAD,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{textAlign:"center"}}>
        <div style={{width:"48px",height:"48px",border:"3px solid rgba(124,58,237,0.2)",borderTop:"3px solid #7c3aed",borderRadius:"50%",margin:"0 auto 1.25rem",animation:"spin 1s linear infinite"}}/>
        <h2 style={{margin:"0 0 0.4rem",fontWeight:700,fontSize:"1.2rem"}}>Reading between the lines...</h2>
        <p style={{color:"#7c3aed",margin:0,fontSize:"0.9rem"}}>{progress}</p>
      </div>
    </div>
  );

  if(stage==="results"&&analysis){
    const mc=MBTI_COLORS[analysis.mbti]||"#7c3aed";
    const accentCols=["#7c3aed","#db2777","#0891b2","#059669","#ea580c"];
    const traits=[{l:"Openness",v:analysis.personality?.openness,c:"#7c3aed"},{l:"Conscientious",v:analysis.personality?.conscientiousness,c:"#db2777"},{l:"Extraversion",v:analysis.personality?.extraversion,c:"#0891b2"},{l:"Agreeableness",v:analysis.personality?.agreeableness,c:"#059669"},{l:"Neuroticism",v:analysis.personality?.neuroticism,c:"#ea580c"}];
    const pd=[{trait:"Open",value:analysis.personality?.openness},{trait:"Conscientious",value:analysis.personality?.conscientiousness},{trait:"Extraverted",value:analysis.personality?.extraversion},{trait:"Agreeable",value:analysis.personality?.agreeableness},{trait:"Neurotic",value:analysis.personality?.neuroticism}];
    const rankG=["linear-gradient(135deg,#fbbf24,#f59e0b)","linear-gradient(135deg,#e2e8f0,#94a3b8)","linear-gradient(135deg,#cd7f32,#b45309)",`${mc}30`,`${mc}20`];
    const medals=["🥇","🥈","🥉","4","5"];

    const Section = ({children, illus, minH="auto", pad="2rem"}) => (
      <div style={{position:"relative",overflow:"hidden",minHeight:minH}}>
        <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"}}>{illus}</div>
        <div style={{position:"relative",zIndex:1,padding:pad,maxWidth:"900px",margin:"0 auto"}}>{children}</div>
      </div>
    );

    return(
      <div style={{...PAGE}}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

        {/* Section 1: MBTI + identity — MBTI-type illustration */}
        <Section illus={<SceneBG mbti={analysis.mbti} c={mc}/>} minH="320px" pad="2rem 2rem 1.5rem">
          <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
            <h1 style={{fontSize:"1.8rem",fontWeight:800,margin:"0 0 0.25rem",background:"linear-gradient(135deg,#7c3aed,#db2777)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",paddingBottom:"6px",display:"inline-block"}}>Your AI Mirror</h1>
            <p style={{color:"#4a4a6a",margin:0,fontSize:"0.84rem"}}>{msgCount.toLocaleString()} messages analysed</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            <div style={{...card(),background:`linear-gradient(135deg,${mc}28,rgba(14,14,22,0.9))`,border:`1px solid ${mc}45`,overflow:"hidden"}}>
              <div style={{position:"absolute",top:"-15px",right:"-8px",fontSize:"5rem",opacity:.07,fontWeight:900,letterSpacing:"-2px"}}>{analysis.mbti}</div>
              <span style={lbl}>{MBTI_GROUP[analysis.mbti]||"Type"}</span>
              <div style={{fontSize:"2.6rem",fontWeight:900,color:mc,lineHeight:1,letterSpacing:"0.05em"}}>{analysis.mbti}</div>
              <p style={{color:"#94a3b8",fontSize:"0.82rem",lineHeight:1.5,margin:"0.6rem 0 0"}}>{analysis.mbtiReason}</p>
            </div>
            <div style={{display:"grid",gridTemplateRows:"1fr 1fr",gap:"1rem"}}>
              <div style={card()}>
                <span style={lbl}>Dominant Emotion</span>
                <div style={{fontSize:"1.5rem",fontWeight:800,color:"#a78bfa",textTransform:"capitalize"}}>{analysis.dominantEmotion}</div>
              </div>
              <div style={card()}>
                <span style={lbl}>AI Style</span>
                <div style={{color:"#94a3b8",fontSize:"0.82rem",lineHeight:1.5}}>{analysis.askingStyle}</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Personality + Mood — mood-responsive landscape */}
        <Section illus={<MoodBG moodData={analysis.moodByMonth} c={mc}/>} pad="1.5rem 2rem">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            <div style={card()}>
              <span style={lbl}>Personality Profile</span>
              <ResponsiveContainer width="100%" height={155}>
                <RadarChart data={pd} margin={{top:8,right:18,bottom:8,left:18}}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)"/>
                  <PolarAngleAxis dataKey="trait" tick={{fill:"#4a4a6a",fontSize:10}}/>
                  <Radar dataKey="value" stroke={mc} fill={mc} fillOpacity={0.2} strokeWidth={2}/>
                </RadarChart>
              </ResponsiveContainer>
              <div style={{marginTop:"0.6rem",display:"flex",flexDirection:"column",gap:"0.35rem"}}>
                {traits.map(t=>(
                  <div key={t.l} style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                    <span style={{color:"#4a4a6a",fontSize:"0.72rem",width:"90px",flexShrink:0}}>{t.l}</span>
                    <div style={{flex:1,height:"4px",borderRadius:"99px",background:"rgba(255,255,255,0.05)",overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${t.v||0}%`,background:t.c,borderRadius:"99px"}}/>
                    </div>
                    <span style={{color:t.c,fontSize:"0.72rem",width:"24px",textAlign:"right",fontWeight:700}}>{t.v}</span>
                  </div>
                ))}
              </div>
              <p style={{color:"#4a4a6a",fontSize:"0.78rem",lineHeight:1.5,margin:"0.6rem 0 0"}}>{analysis.personality?.summary}</p>
            </div>
            <div style={card()}>
              <span style={lbl}>Mood Over Time</span>
              {analysis.moodByMonth?.length>1?(
                <>
                  <ResponsiveContainer width="100%" height={175}>
                    <AreaChart data={analysis.moodByMonth} margin={{top:5,right:5,bottom:25,left:-20}}>
                      <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#db2777" stopOpacity={.4}/><stop offset="95%" stopColor="#db2777" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                      <XAxis dataKey="month" tick={{fill:"#4a4a6a",fontSize:8}} angle={-35} textAnchor="end" interval={0}/>
                      <YAxis domain={[0,100]} tick={{fill:"#4a4a6a",fontSize:8}}/>
                      <Tooltip contentStyle={{background:"rgba(14,14,22,0.95)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"0.5rem",fontSize:"0.8rem"}}
                        formatter={(v,n,p)=>[<span><b style={{color:"#db2777"}}>{v}</b> · {p.payload.label}<br/><span style={{color:"#64748b",fontSize:"0.72rem"}}>{p.payload.desc}</span></span>,""]}
                        labelStyle={{color:"#e2e8f0"}}/>
                      <Area type="monotone" dataKey="score" stroke="#db2777" strokeWidth={2.5} fill="url(#mg)" dot={{fill:"#db2777",r:3,strokeWidth:0}} activeDot={{r:5}}/>
                    </AreaChart>
                  </ResponsiveContainer>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"0.3rem",marginTop:"0.4rem"}}>
                    {analysis.moodByMonth.map((m,i)=>(
                      <div key={i} style={{fontSize:"0.66rem",background:"rgba(219,39,119,0.1)",border:"1px solid rgba(219,39,119,0.18)",borderRadius:"99px",padding:"0.12rem 0.45rem",color:"#f472b6",whiteSpace:"nowrap"}}>{m.month}: {m.label}</div>
                    ))}
                  </div>
                </>
              ):<div style={{color:"#4a4a6a",textAlign:"center",paddingTop:"4rem"}}>Not enough monthly data</div>}
            </div>
          </div>
        </Section>

        {/* Section 3: Topics — topic emoji cloud bg */}
        <Section illus={<TopicsBG topics={analysis.topTopics}/>} pad="1.5rem 2rem">
          <div style={card()}>
            <span style={lbl}>Most Talked About — Ranked</span>
            <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              {(analysis.topTopics||[]).map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.6rem 0.9rem",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:"0.85rem"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"50%",background:rankG[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:i<3?"0.9rem":"0.72rem",fontWeight:800,color:i<3?"#000":"#a78bfa",flexShrink:0,boxShadow:i<3?`0 0 12px ${accentCols[i]}50`:"none"}}>{medals[i]}</div>
                  <span style={{fontSize:"1.2rem",flexShrink:0}}>{t.emoji}</span>
                  <span style={{color:"#e2e8f0",fontWeight:600,fontSize:"0.9rem",flex:1}}>{t.topic}</span>
                  <div style={{width:"90px",height:"5px",background:"rgba(255,255,255,0.05)",borderRadius:"99px",overflow:"hidden",flexShrink:0}}>
                    <div style={{height:"100%",width:`${[100,78,60,44,30][i]}%`,background:rankG[i],borderRadius:"99px"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 4: Insights — mind/neural illustration */}
        <Section illus={<MindBG personality={analysis.personality} c={mc}/>} pad="1.5rem 2rem">
          <div style={card()}>
            <span style={lbl}>Personality Insights</span>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
              {(analysis.insights||[]).map((ins,i)=>(
                <div key={i} style={{background:`${mc}08`,border:`1px solid ${mc}18`,borderRadius:"0.85rem",padding:"0.85rem 1rem",fontSize:"0.86rem",color:"#c4b5fd",lineHeight:1.55}}>{ins}</div>
              ))}
            </div>
          </div>
        </Section>

        {/* Section 5: Advice — tech/circuit illustration */}
        <Section illus={<TechBG c={mc}/>} pad="1.5rem 2rem 2.5rem">
          <div style={{...card({background:"rgba(8,145,178,0.07)",border:"1px solid rgba(8,145,178,0.22)"}),marginBottom:"1.5rem"}}>
            <span style={{...lbl,color:"#67e8f9"}}>💡 How to Get More From AI</span>
            <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              {(analysis.aiAdvice||[]).map((tip,i)=>(
                <div key={i} style={{display:"flex",gap:"0.6rem",alignItems:"flex-start"}}>
                  <span style={{color:"#0891b2",flexShrink:0,fontWeight:700}}>→</span>
                  <span style={{color:"#94a3b8",fontSize:"0.87rem",lineHeight:1.5}}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={()=>{setStage("upload");setAnalysis(null);setError(null);setMsgCount(0);}}
            style={{width:"100%",padding:"0.85rem",background:"transparent",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"1rem",color:"#4a4a6a",cursor:"pointer",fontSize:"0.88rem",fontWeight:500}}>
            ↩ Analyse another file
          </button>
        </Section>
      </div>
    );
  }
  return null;
}