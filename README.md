# 무한상상실 기기 사용법

전주교대 부설초등학교 교사연수용. 메이커 교실(무한상상실)의 3D프린터·레이저커터·승화전사 머그·버튼제작기 사용법과 연습 파일 만들기 도구입니다.

- 주소: https://maker-ssam.github.io/2026jjbs/
- `index.html` — 메인 슬라이드(제목 + 버튼 0~4). 큰 화면은 16:9 표지, 휴대폰은 세로 목록. 예전 주소 `#3d` `#laser` `#mug` `#button`은 그 기기 매뉴얼로 넘겨 줌
- `link.html` — 0. 접속링크(이 사이트 주소·QR)
- `3d/` `laser/` `mug/` `button/` — 기기별 슬라이드 `index.html`(차례 → 1. 작동원리 → 2. 유용한 사이트 모음 → 3. 연수자료 → 4. 기기작동 매뉴얼)과 세로로 내려 보는 `manual.html`
- `assets/deck/` — 슬라이드 엔진. `core.css` `core.js` `objects.js`는 Lecture-Notes 강의 덱 엔진 사본(1920×1080 무대, 오른쪽 아래 메인으로·이전·다음), `jjbs.css` `jjbs.js`는 이 사이트에만 쓰는 것. 3D프린터 작동원리 두 장은 Lecture-Notes `3d-school` 덱에서 가져옴
- `keycap/` — 칸에 글씨를 넣는 3D 키캡 뚜껑(STL). easy3D `festival02`를 가져와 제출 대신 바로 받기로 고침
- `nametag/` — 레이저 이름표(DXF, RDWorks용). easy3D 갤러리5(이름표 열쇠고리)를 가져와 돌출 대신 자르기·새기기 선으로 내보냄
- `qr.html` — 기기 옆에 붙일 QR 인쇄 종이(각 기기 `manual.html`로 연결)
- `assets/js` `assets/css` `assets/fonts` `assets/models` — easy3D에서 가져온 공용 파일(글꼴은 큰 3종을 뺐음)

설치나 빌드 없이 파일 그대로 GitHub Pages로 배포합니다. 로컬 미리보기는 이 폴더에서 `python3 -m http.server`.

## 원작·라이선스
- 키캡 뚜껑 모델: kongkoka, [MakerWorld](https://makerworld.com/ko/models/2854834-customizable-name-word-clicker-keychain) — 표준 디지털 파일 라이선스, 원작자에게 비상업적 활용 허가를 받음(`assets/licenses/clicker-permission-kongkoka.png`)
- 이름표 디자인: [MakerWorld](https://makerworld.com/ko/models/2640504-parametric-name-tag-keychain-with-korean-input) — CC BY-SA
- 글꼴: `assets/fonts/licenses/`의 각 라이선스를 따릅니다. Noto Emoji는 SIL OFL 1.1.
