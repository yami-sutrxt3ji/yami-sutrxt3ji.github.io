import { useState, useEffect, useRef } from 'react';
import RetroWindow from '../ui/RetroWindow';
import RetroButton from '../ui/RetroButton';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GOALS = [
  'FULL_STACK', 'HARDWARE_HACK', 'UI_DESIGN', 'RUST_WASM', 
  'OPEN_SOURCE', 'TINKERING', 'IOT_SYSTEMS', '3D_FABRICATION'
];

const ArcadeModal = ({ isOpen, onClose }: ArcadeModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState('READY');

  const gameState = useRef({
    player: { x: 50, y: 150, size: 20 },
    bullets: [] as { x: number, y: number, speed: number, text: string }[],
    targets: [] as { x: number, y: number, text: string, speed: number, width: number }[],
    particles: [] as { x: number, y: number, vx: number, vy: number, life: number, color: string }[],
    lastSpawn: 0,
    mouseX: 50,
    mouseY: 150
  });

  useEffect(() => {
    const saved = localStorage.getItem('arcadeHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const spawnTarget = () => {
    const text = GOALS[Math.floor(Math.random() * GOALS.length)];
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    gameState.current.targets.push({
      x: canvas.width + 50,
      y: Math.random() * (canvas.height - 40) + 20,
      text,
      speed: 2 + Math.random() * 2 + (score / 1000),
      width: text.length * 8
    });
  };

  const createExplosion = (x: number, y: number, color: string) => {
    for (let i = 0; i < 10; i++) {
      gameState.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        color
      });
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStatus('EXECUTING');
    gameState.current.bullets = [];
    gameState.current.targets = [];
    gameState.current.particles = [];
  };

  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (time: number) => {
      // Clear
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn targets
      if (time - gameState.current.lastSpawn > 1500 - Math.min(score / 2, 800)) {
        spawnTarget();
        gameState.current.lastSpawn = time;
      }

      // Update player
      gameState.current.player.y += (gameState.current.mouseY - gameState.current.player.y) * 0.1;

      // Draw player (Shooter)
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.moveTo(gameState.current.player.x, gameState.current.player.y - 10);
      ctx.lineTo(gameState.current.player.x + 20, gameState.current.player.y);
      ctx.lineTo(gameState.current.player.x, gameState.current.player.y + 10);
      ctx.fill();

      // Update & Draw Bullets (Interests/Interests)
      ctx.font = '10px "IBM Plex Mono"';
      gameState.current.bullets.forEach((b, i) => {
        b.x += b.speed;
        ctx.fillStyle = '#ff4b81';
        ctx.fillText(b.text, b.x, b.y);

        if (b.x > canvas.width) gameState.current.bullets.splice(i, 1);
      });

      // Update & Draw Targets (Goals)
      gameState.current.targets.forEach((t, i) => {
        t.x -= t.speed;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#00e5ff';
        ctx.strokeRect(t.x - 5, t.y - 15, t.width + 10, 20);
        ctx.fillText(t.text, t.x, t.y);

        // Collision with bullets
        gameState.current.bullets.forEach((b, bi) => {
          if (b.x > t.x && b.x < t.x + t.width && b.y > t.y - 15 && b.y < t.y + 5) {
            createExplosion(t.x + t.width / 2, t.y, '#00e5ff');
            gameState.current.targets.splice(i, 1);
            gameState.current.bullets.splice(bi, 1);
            setScore(s => s + 100);
          }
        });

        // Collision with player or edge
        if (t.x < 0) {
          setIsPlaying(false);
          setStatus('SYSTEM_FAIL');
        }
      });

      // Particles
      gameState.current.particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, 2, 2);
        if (p.life <= 0) gameState.current.particles.splice(i, 1);
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, isOpen, score]);

  useEffect(() => {
    if (status === 'SYSTEM_FAIL') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('arcadeHighScore', score.toString());
      }
    }
  }, [status, score, highScore]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      gameState.current.mouseY = e.clientY - rect.top;
    }
  };

  const handleShoot = () => {
    if (!isPlaying) return;
    const bulletText = ['CODE', 'BUILD', 'FIX', 'HACK'][Math.floor(Math.random() * 4)];
    gameState.current.bullets.push({
      x: gameState.current.player.x + 20,
      y: gameState.current.player.y,
      speed: 7,
      text: bulletText
    });
  };

  const footer = (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-4">
        {!isPlaying ? (
          <RetroButton size="sm" onClick={startGame}>EXECUTE_ARCADE</RetroButton>
        ) : (
          <span className="text-portfolio-accent animate-pulse font-mono text-xs uppercase">Game_In_Progress...</span>
        )}
      </div>
      <div className="flex gap-4 font-mono text-xs text-black uppercase">
        <div className="bg-[#c0c0c0] border-2 border-b-white border-r-white border-l-[#808080] border-t-[#808080] px-3 py-1">
          SCORE: <span className="text-blue-800 font-bold">{score.toString().padStart(5, '0')}</span>
        </div>
        <div className="bg-[#c0c0c0] border-2 border-b-white border-r-white border-l-[#808080] border-t-[#808080] px-3 py-1">
          HIGH: <span className="text-portfolio-accent font-bold">{highScore.toString().padStart(5, '0')}</span>
        </div>
      </div>
    </div>
  );

  return (
    <RetroWindow 
      isOpen={isOpen} 
      onClose={onClose} 
      title="GOAL_HUNTER_98.EXE" 
      footer={footer}
    >
      <div className="relative group bg-black p-2 border-b-2 border-[#808080]">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          onMouseMove={handleMouseMove}
          onClick={handleShoot}
          className="w-full cursor-crosshair"
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <h3 className={`font-display text-2xl mb-4 ${status === 'SYSTEM_FAIL' ? 'text-red-500' : 'text-portfolio-border'}`}>
                {status}
              </h3>
              <p className="text-white font-mono text-xs mb-6 max-w-xs mx-auto">
                {status === 'SYSTEM_FAIL' 
                  ? 'A GOAL SLIPPED THROUGH THE KERNEL. RE-INITIALIZE?' 
                  : 'SHOOT YOUR INTERESTS (BULLETS) AT YOUR GOALS (TARGETS). DONT LET GOALS PASS.'}
              </p>
              <RetroButton variant={status === 'SYSTEM_FAIL' ? 'danger' : 'primary'} onClick={startGame}>
                {status === 'SYSTEM_FAIL' ? 'REBOOT_SYSTEM' : 'START_MISSION'}
              </RetroButton>
            </div>
          </div>
        )}
      </div>
    </RetroWindow>
  );
};

export default ArcadeModal;
