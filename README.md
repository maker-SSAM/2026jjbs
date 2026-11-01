# 무한상상실 기기 사용법

전주교대 부설초등학교 교사연수용. 메이커 교실(무한상상실)의 3D프린터·레이저커터·승화전사 머그·버튼제작기 사용법과 연습 파일 만들기 도구입니다.

- 주소: https://maker-ssam.github.io/2026jjbs/
- `index.html` — 기기별 사용법(기기별 주소 `#3d` `#laser` `#mug` `#button`)
- `keycap/` — 칸에 글씨를 넣는 3D 키캡 뚜껑(STL). easy3D `festival02`를 가져와 제출 대신 바로 받기로 고침
- `nametag/` — 레이저 이름표(DXF, RDWorks용). easy3D 갤러리5(이름표 열쇠고리)를 가져와 돌출 대신 자르기·새기기 선으로 내보냄
- `qr.html` — 기기 옆에 붙일 QR 인쇄 종이
- `assets/js` `assets/css` `assets/fonts` `assets/models` — easy3D에서 가져온 공용 파일(글꼴은 큰 3종을 뺐음)

설치나 빌드 없이 파일 그대로 GitHub Pages로 배포합니다. 로컬 미리보기는 이 폴더에서 `python3 -m http.server`.

## 원작·라이선스
- 키캡 뚜껑 모델: kongkoka, [MakerWorld](https://makerworld.com/ko/models/2854834-customizable-name-word-clicker-keychain) — 표준 디지털 파일 라이선스, 원작자에게 비상업적 활용 허가를 받음(`assets/licenses/clicker-permission-kongkoka.png`)
- 이름표 디자인: [MakerWorld](https://makerworld.com/ko/models/2640504-parametric-name-tag-keychain-with-korean-input) — CC BY-SA
- 글꼴: `assets/fonts/licenses/`의 각 라이선스를 따릅니다. Noto Emoji는 SIL OFL 1.1.
