# nz2026
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#2563eb">
<link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/826/826070.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>NZ Trip 2026 | 天藍色可愛手帳</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --paper-bg: #fdfdfd;
            --sky-main: #e0f2fe;
            --sky-accent: #38bdf8;
        }
        body {
            font-family: 'Inter', 'Noto Sans TC', sans-serif;
            background-color: #f0f9ff;
            background-image: 
                radial-gradient(#e0f2fe 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5));
            background-size: 20px 20px, 100% 100%;
            color: #1e293b;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
        }
        /* Custom scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        header {
            padding-top: env(safe-area-inset-top);
        }
        /* Washi Tape Effect */
        .washi-tape {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%) rotate(-2deg);
            width: 80px;
            height: 24px;
            background: rgba(56, 189, 248, 0.4);
            backdrop-filter: blur(2px);
            box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
            z-index: 20;
            clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%);
        }
        .washi-tape-pink { background: rgba(244, 114, 182, 0.4); }
        .washi-tape-green { background: rgba(74, 222, 128, 0.4); }

        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.9) translateY(20px); }
            70% { opacity: 1; transform: scale(1.02) translateY(-5px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-cute {
            animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    </style>
<script type="importmap">
{
  "imports": {
    "@google/genai": "https://esm.sh/@google/genai@^1.41.0",
    "react": "https://esm.sh/react@^19.2.4",
    "react/": "https://esm.sh/react@^19.2.4/",
    "lucide-react": "https://esm.sh/lucide-react@^0.564.0",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/"
  }
}
</script>
</head>
<body>
    <div id="root"></div>
  <script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('PWA Service Worker 註冊成功！'))
        .catch(err => console.log('註冊失敗：', err));
    });
  }
</script>
</body>
</html>
