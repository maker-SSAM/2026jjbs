/* jjbs.js — 연수 덱 공통 마무리. 장면 HTML 뒤에서 JJ.start() 를 부른다.
   · 엔진(core.js)이 쓰는 조작 화면(#bar #hud #notes #overview #help #blank)을 붙인다
   · <a data-goto="장면id"> → 그 장 번호(#n)로 이어 준다(장을 더하거나 빼도 차례 링크가 맞게)
   · <div data-qr="주소"> → QR 그림(qrcodejs)
   · '메인으로' 버튼은 엔진이 <meta name="deck-home"> 를 보고 만든다 */
window.JJ = {
  BASE: 'https://maker-ssam.github.io/2026jjbs/',
  start() {
    document.body.insertAdjacentHTML('beforeend',
      '<div id="bar"></div><div id="hud"></div><div id="notes"></div><div id="overview"></div>' +
      '<div id="help"><h3>강의 조작</h3><dl>' +
      '<dt>→ · Space · 클릭</dt><dd>다음</dd><dt>← · 오른쪽 클릭</dt><dd>이전</dd>' +
      '<dt>오른쪽 아래 버튼</dt><dd>메인으로 / 이전 / 다음</dd><dt>O</dt><dd>전체 보기(목차)</dd>' +
      '<dt>N</dt><dd>발표자 노트</dd><dt>F</dt><dd>전체 화면</dd><dt>B / W</dt><dd>검은 화면 / 흰 화면</dd>' +
      '<dt>좌우로 밀기</dt><dd>전자칠판에서 넘기기</dd></dl></div><div id="blank"></div>');
    const slides = [...document.querySelectorAll('#stage > .slide')];
    document.querySelectorAll('[data-goto]').forEach(a => {
      const i = slides.findIndex(s => s.id === a.dataset.goto);
      if (i >= 0) a.href = '#' + (i + 1);
    });
    document.querySelectorAll('[data-qr]').forEach(el => {
      const size = +el.dataset.size || 300;
      if (window.QRCode) new QRCode(el, { text: el.dataset.qr, width: size, height: size, correctLevel: QRCode.CorrectLevel.M });
    });
    Deck.start();
  }
};
