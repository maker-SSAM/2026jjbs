// 글자 → 닫힌 윤곽선(점 목록) 변환. 레이저(DXF)와 3D(STL) 페이지가 함께 쓴다.
// opentype.js(1.3.4)가 필요하다. woff2는 못 읽어서 fonts/ 의 .ttf를 쓴다.
const Glyph = (() => {
  // laser: false — 글자 안에서 획 윤곽이 겹치는 글꼴(페이퍼로지는 한글 2350자 중 208자).
  // 레이저 새기기는 겹친 곳을 비워서 칠할 수 있어 레이저 페이지에서는 뺀다(3D는 슬라이서가 합쳐 줘서 괜찮다).
  const FONTS = [
    { label: '학교안심 떡볶이 (둥근 글씨)', file: 'fonts/Hakgyoansim_TteokbokkiB.ttf' },
    { label: '카페24 프로업 (굵은 제목 글씨)', file: 'fonts/Cafe24PROUP.ttf' },
    { label: '페이퍼로지 (반듯한 글씨)', file: 'fonts/Paperlogy-8ExtraBold.ttf', laser: false }
  ];
  const cache = {};

  function loadFont(i) {
    const f = FONTS[i];
    if (!cache[f.file]) cache[f.file] = opentype.load(f.file);
    return cache[f.file];
  }

  // 곡선을 짧은 직선으로 나눈다. 글자 크기 1000 기준으로 계산한 뒤 나중에 줄인다.
  const CURVE_STEPS = 10;
  function contoursOf(font, text) {
    const path = font.getPath(text, 0, 0, 1000);
    const out = [];
    let cur = null, x = 0, y = 0;
    for (const c of path.commands) {
      if (c.type === 'M') {
        if (cur && cur.length > 2) out.push(cur);
        cur = [[c.x, -c.y]]; x = c.x; y = c.y;
      } else if (c.type === 'L') {
        cur.push([c.x, -c.y]); x = c.x; y = c.y;
      } else if (c.type === 'Q') {
        for (let k = 1; k <= CURVE_STEPS; k++) {
          const t = k / CURVE_STEPS, u = 1 - t;
          cur.push([u*u*x + 2*u*t*c.x1 + t*t*c.x, -(u*u*y + 2*u*t*c.y1 + t*t*c.y)]);
        }
        x = c.x; y = c.y;
      } else if (c.type === 'C') {
        for (let k = 1; k <= CURVE_STEPS; k++) {
          const t = k / CURVE_STEPS, u = 1 - t;
          cur.push([
            u*u*u*x + 3*u*u*t*c.x1 + 3*u*t*t*c.x2 + t*t*t*c.x,
            -(u*u*u*y + 3*u*u*t*c.y1 + 3*u*t*t*c.y2 + t*t*t*c.y)
          ]);
        }
        x = c.x; y = c.y;
      } else if (c.type === 'Z') {
        if (cur && cur.length > 2) out.push(cur);
        cur = null;
      }
    }
    if (cur && cur.length > 2) out.push(cur);
    // 바로 앞과 같은 점은 뺀다(길이 0인 선을 싫어하는 프로그램이 있다).
    // 끝점이 시작점과 같으면 그것도 뺀다(닫힌 선은 그리는 쪽에서 닫는다).
    const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-3 && Math.abs(a[1] - b[1]) < 1e-3;
    return out.map(p => {
      const q = p.filter((pt, i) => i === 0 || !same(pt, p[i - 1]));
      while (q.length > 2 && same(q[0], q[q.length - 1])) q.pop();
      return q;
    }).filter(q => q.length > 2);
  }

  function bbox(contours) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const p of contours) for (const [x, y] of p) {
      if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
    }
    return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
  }

  // 글자를 상자(가운데 cx, cy / 너비 w, 높이 h)에 비율을 지키며 꽉 맞춘다. 좌표는 mm, y는 위가 +.
  // rotate가 true면 시계 방향으로 90도 돌려서(위→아래로 읽게) 맞춘다.
  function fit(font, text, box, rotate) {
    let cs = contoursOf(font, text);
    if (!cs.length) return { contours: [], height: 0 };
    if (rotate) cs = cs.map(p => p.map(([x, y]) => [y, -x]));
    const b = bbox(cs);
    const s = Math.min(box.w / b.w, box.h / b.h);
    const ox = box.cx - (b.x0 + b.w / 2) * s, oy = box.cy - (b.y0 + b.h / 2) * s;
    const contours = cs.map(p => p.map(([x, y]) => [x * s + ox, y * s + oy]));
    // 글자 높이(읽는 방향 기준): 너무 작아지면 알려 주려고 돌려준다
    return { contours, height: (rotate ? b.w : b.h) * s };
  }

  function area(p) {
    let a = 0;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) a += (p[j][0] + p[i][0]) * (p[j][1] - p[i][1]);
    return a / 2;
  }
  function inside(pt, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  // 3D용: 윤곽선을 "바깥선 + 그 안의 구멍" 묶음으로 나눈다.
  // 글꼴 안에서는 바깥선끼리 감는 방향이 같고 구멍은 반대라서, 가장 큰 윤곽선의 방향을 기준으로 삼는다.
  // (획이 겹치는 글꼴도 겹친 획을 구멍으로 잘못 보지 않는다)
  function groupShapes(contours) {
    if (!contours.length) return [];
    let ref = 0;
    for (const p of contours) if (Math.abs(area(p)) > Math.abs(ref)) ref = area(p);
    const outers = [], holes = [];
    for (const p of contours) (Math.sign(area(p)) === Math.sign(ref) ? outers : holes).push(p);
    const shapes = outers.map(o => ({ outer: o, holes: [], a: Math.abs(area(o)) }));
    for (const h of holes) {
      let best = null;
      for (const s of shapes) if (inside(h[0], s.outer) && (!best || s.a < best.a)) best = s;
      if (best) best.holes.push(h);
    }
    return shapes;
  }

  return { FONTS, loadFont, fit, groupShapes };
})();
