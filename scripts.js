$('.burger').on('click', function (e) {
    e.preventDefault();
    $('.menu-btn').toggleClass('menu-active');
    $('.menu').toggleClass('menu-active');
    $('body').toggleClass('no-scroll');
})
public hideScroll() {
    this._body.classList.add('no-scroll');

    this._scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
    this._body.style.position = 'fixed';
    if (this._hasScrollbar()) {
    // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
        this._body.style.width = `calc(100% - ${this._getScrollbarSize()}px)`;
    } else {
        this._body.style.width = '100%';
    }
    this._body.style.top = -this._scrollTop + 'px';
}
private _getScrollbarSize() { // получение ширины скролла
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

private _hasScrollbar() { // проверка на боковой скролл
    return document.body.scrollHeight > document.body.clientHeight;
}
public showScroll() {
    this._body.classList.remove('no-scroll');

    this._body.style.position = '';
    this._body.style.width = '';
    this._body.style.top = '';
    window.scroll(0, this._scrollTop);
}
