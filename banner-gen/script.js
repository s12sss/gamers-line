document.addEventListener('DOMContentLoaded', () => {
    const inputType = document.getElementById('input_banner_type');
    const inputYear = document.getElementById('input_year');
    const inputMonth = document.getElementById('input_month');
    const inputCustom = document.getElementById('input_custom_text');
    const inputCustomSub = document.getElementById('input_custom_sub');
    const inputCustomBadge = document.getElementById('input_custom_badge');
    const inputBrandName = document.getElementById('input_brand_name');
    const inputBgImage = document.getElementById('input_bg_image');
    const inputBgOpacity = document.getElementById('input_bg_opacity');
    const downloadBtn = document.getElementById('download_btn');

    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    let backgroundImageDataUrl = '';

    const defaults = {
        feature: {
            badge: 'GEAR FEATURE',
            main: 'ゲーム部屋ギア特集',
            sub: 'テーマ別に選ぶデスク周りのおすすめ',
            dated: false,
        },
        bestbuy: {
            badge: 'BEST BUY',
            main: '買ってよかったモノ',
            sub: 'デスク周り・ゲーミングガジェット厳選',
            dated: true,
        },
        review: {
            badge: 'DEVICE REVIEW',
            main: '買ってよかったガジェットレビュー',
            sub: '実際に使って分かった良いところ・微妙なところ',
            dated: false,
        },
        rakuten: {
            badge: 'RAKUTEN SALE',
            main: '楽天セール攻略まとめ',
            sub: 'ゲーミング部屋をアップグレードする最適解',
            dated: true,
        },
        custom: {
            badge: 'GEAR SELECT',
            main: '自由にタイトルを入力',
            sub: 'サブコピーも自由に変更できます',
            dated: false,
        },
    };

    function splitText(text, maxChars, maxLines) {
        const normalized = text.replace(/\s+/g, ' ').trim();
        if (normalized.length <= maxChars) return [normalized];

        const lines = [];
        let rest = normalized;

        while (rest.length > 0 && lines.length < maxLines) {
            if (rest.length <= maxChars) {
                lines.push(rest);
                break;
            }

            let cut = rest.lastIndexOf(' ', maxChars);
            if (cut < Math.floor(maxChars * 0.55)) cut = maxChars;

            lines.push(rest.slice(0, cut).trim());
            rest = rest.slice(cut).trim();
        }

        if (rest && lines.length === maxLines) {
            const last = lines[maxLines - 1];
            lines[maxLines - 1] = last.length >= maxChars ? `${last.slice(0, maxChars - 1)}...` : `${last}...`;
        }

        return lines.filter(Boolean);
    }

    function setSvgTextLines(element, text, maxChars, maxLines, lineHeight) {
        if (!element) return;

        const x = element.getAttribute('x') || '640';
        if (!element.dataset.baseY) {
            element.dataset.baseY = element.getAttribute('y') || '0';
        }

        const baseY = Number(element.dataset.baseY);
        const lines = splitText(text, maxChars, maxLines);
        const startY = baseY - ((lines.length - 1) * lineHeight) / 2;

        element.textContent = '';
        lines.forEach((line, index) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', x);
            tspan.setAttribute('y', String(startY + index * lineHeight));
            tspan.textContent = line;
            element.appendChild(tspan);
        });
    }

    function setBackgroundImage(type) {
        const bgElement = document.getElementById(`bg_image_${type}`);
        if (!bgElement) return;

        if (!backgroundImageDataUrl) {
            bgElement.removeAttribute('href');
            bgElement.removeAttributeNS(XLINK_NS, 'href');
            bgElement.setAttribute('opacity', '0');
            return;
        }

        bgElement.setAttribute('href', backgroundImageDataUrl);
        bgElement.setAttributeNS(XLINK_NS, 'href', backgroundImageDataUrl);
        bgElement.setAttribute('opacity', inputBgOpacity.value || '0.22');
    }

    function updatePreview() {
        const type = inputType.value;
        const template = defaults[type] || defaults.feature;
        const year = inputYear.value;
        const month = inputMonth.value;
        const customText = inputCustom.value.trim();
        const customSub = inputCustomSub.value.trim();
        const customBadge = inputCustomBadge.value.trim();
        const brandName = inputBrandName.value.trim() || 'ギアセレクト';

        document.querySelectorAll('.svg-wrapper').forEach((wrapper) => {
            wrapper.classList.remove('active');
        });
        document.getElementById(`wrapper_${type}`).classList.add('active');

        const prefix = template.dated && year && month ? `【${year}年${month}月版】` : '';
        const mainText = `${prefix}${customText || template.main}`;
        const subText = customSub || template.sub;
        const badgeText = customBadge || template.badge;

        const badgeElement = document.getElementById(`text_badge_${type}`);
        if (badgeElement) {
            badgeElement.textContent = badgeText.toUpperCase();
        }

        const brandElement = document.getElementById(`text_brand_${type}`);
        if (brandElement) {
            brandElement.textContent = brandName;
        }

        setSvgTextLines(document.getElementById(`text_main_${type}`), mainText, 22, 2, 74);
        setSvgTextLines(document.getElementById(`text_sub_${type}`), subText, 32, 2, 38);
        setBackgroundImage(type);
    }

    inputType.addEventListener('change', updatePreview);
    inputYear.addEventListener('input', updatePreview);
    inputMonth.addEventListener('input', updatePreview);
    inputCustom.addEventListener('input', updatePreview);
    inputCustomSub.addEventListener('input', updatePreview);
    inputCustomBadge.addEventListener('input', updatePreview);
    inputBrandName.addEventListener('input', updatePreview);
    inputBgOpacity.addEventListener('input', updatePreview);
    inputBgImage.addEventListener('change', () => {
        const file = inputBgImage.files && inputBgImage.files[0];
        if (!file) {
            backgroundImageDataUrl = '';
            updatePreview();
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            backgroundImageDataUrl = String(reader.result || '');
            updatePreview();
        });
        reader.readAsDataURL(file);
    });

    updatePreview();

    downloadBtn.addEventListener('click', () => {
        const type = inputType.value;
        const svgElement = document.getElementById(`svg_${type}`);
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);

        if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
            svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        const canvas = document.createElement('canvas');
        canvas.width = 1280;
        canvas.height = 670;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const domUrl = window.URL || window.webkitURL || window;
        const url = domUrl.createObjectURL(svgBlob);

        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            domUrl.revokeObjectURL(url);

            try {
                const pngDataUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.download = `gearselect_${type}_banner.png`;
                a.href = pngDataUrl;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                const originalText = downloadBtn.innerHTML;
                downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ダウンロード完了';
                downloadBtn.style.background = 'linear-gradient(135deg, #00E676, #00C853)';
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.style.background = '';
                }, 2000);
            } catch (error) {
                console.error('Canvas toDataURL failed', error);
                alert('画像の書き出しに失敗しました。');
            }
        };

        img.onerror = (error) => {
            console.error('Image load error', error);
            alert('SVG画像の読み込みに失敗しました。');
        };

        img.src = url;
    });
});
