# md-viewer

Markdown, LaTeX, SVG, 이미지 파일을 다루는 데스크톱/웹 겸용 Markdown 뷰어 겸 편집기입니다.

## 개요

Electron 앱과 로컬 웹 서버 양쪽 실행 방식을 모두 실험합니다. Markdown 문서를 열고 실시간으로 렌더링하며, 이미지 폴더를 함께 연결하는 흐름도 포함합니다.

주요 파일:
- `index.html`, `script.js`, `style.css`: 기본 UI
- `LatexTable.js`, `latex.js`: LaTeX/표 처리 보조
- `main.js`, `preload.js`: Electron 진입점
- `server.js`, `serve_local.py`: 로컬 서버 실행 지원
- `test.md`: 샘플 문서

## 기능

- Markdown 실시간 렌더링
- LaTeX/수식 처리
- SVG/이미지 포함 문서 미리보기
- 데스크톱 앱 또는 웹 서버 방식 실행

## 실행 방법

웹 서버 방식:

```bash
node server.js
```

또는

```bash
python serve_local.py
```

Electron 방식:

```bash
npm install
npm start
```
