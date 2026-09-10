// GitHub Pages 배포에 필요하지만 `expo export`가 만들어 주지 않는 파일을 dist/에 채운다.
// export:web 이 끝나면 자동 실행된다 (package.json).
//
//   .nojekyll — 없으면 Pages의 Jekyll이 밑줄로 시작하는 `_expo/`를 통째로 무시한다.
//               번들 JS가 404가 나고 앱이 빈 화면으로 뜬다.
//   404.html  — index.html 사본. SPA(output: "single")라 /history 같은 딥링크나
//               새로고침을 Pages가 404로 넘기는데, 이 파일이 라우터를 다시 띄워 준다.
//
// 실행: node scripts/postexport-web.mjs [dist경로]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const dist = path.resolve(process.argv[2] || path.join(ROOT, 'dist'));

const indexPath = path.join(dist, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error(`index.html이 없습니다: ${indexPath}\n먼저 \`npm run export:web\`으로 빌드하세요.`);
  process.exit(1);
}

fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.copyFileSync(indexPath, path.join(dist, '404.html'));

console.log('✓ .nojekyll, 404.html 생성 완료');
