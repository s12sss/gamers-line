document.addEventListener('DOMContentLoaded', () => {
    const inputType = document.getElementById('input_banner_type');
    const inputYear = document.getElementById('input_year');
    const inputMonth = document.getElementById('input_month');
    const inputCustom = document.getElementById('input_custom_text');
    const inputCustomSub = document.getElementById('input_custom_sub');
    const downloadBtn = document.getElementById('download_btn');

    // Default texts
    const defaults = {
        rakuten: { main: '楽天セール攻略まとめ', sub: 'ゲーマーの部屋をアップグレードする最適解' },
        bestbuy: { main: '買ってよかったモノ', sub: 'デスク周り・ゲーミングガジェット厳選' }
    };

    function updatePreview() {
        const type = inputType.value;
        const year = inputYear.value;
        const month = inputMonth.value;
        const customText = inputCustom.value.trim();
        const customSub = inputCustomSub.value.trim();

        // Switch active wrapper
        document.querySelectorAll('.svg-wrapper').forEach(wrapper => {
            wrapper.classList.remove('active');
        });
        document.getElementById(`wrapper_${type}`).classList.add('active');

        // Determine the text
        const prefix = (year && month) ? `【${year}年${month}月版】` : '';
        const baseText = customText !== '' ? customText : defaults[type].main;
        const finalText = prefix + baseText;
        const finalSub = customSub !== '' ? customSub : defaults[type].sub;

        // Update the corresponding SVG text elements
        const textElement = document.getElementById(`text_main_${type}`);
        if (textElement) {
            textElement.textContent = finalText;
        }
        
        const subTextElement = document.getElementById(`text_sub_${type}`);
        if (subTextElement) {
            subTextElement.textContent = finalSub;
        }
    }

    // Add event listeners
    inputType.addEventListener('change', updatePreview);
    inputYear.addEventListener('input', updatePreview);
    inputMonth.addEventListener('input', updatePreview);
    inputCustom.addEventListener('input', updatePreview);
    inputCustomSub.addEventListener('input', updatePreview);

    // Initial update
    updatePreview();

    // Download functionality using SVG-to-Canvas
    downloadBtn.addEventListener('click', () => {
        const type = inputType.value;
        const svgElement = document.getElementById(`svg_${type}`);
        
        // Serialize SVG to XML string
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);

        // Add proper XML namespaces if missing
        if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        // Create a Canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 1280;
        canvas.height = 670;
        const ctx = canvas.getContext('2d');

        // Create an Image from the SVG string
        const img = new Image();
        
        // Important for external fonts/resources
        img.crossOrigin = "Anonymous";
        
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const DOMURL = window.URL || window.webkitURL || window;
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
            // Draw image on canvas
            ctx.drawImage(img, 0, 0);
            
            // Cleanup
            DOMURL.revokeObjectURL(url);
            
            // Trigger download
            try {
                const pngDataUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.download = `gl_${type}_banner.png`;
                a.href = pngDataUrl;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // Success feedback
                const originalText = downloadBtn.innerHTML;
                downloadBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ダウンロード完了！';
                downloadBtn.style.background = 'linear-gradient(135deg, #00E676, #00C853)';
                setTimeout(() => {
                    downloadBtn.innerHTML = originalText;
                    downloadBtn.style.background = '';
                }, 2000);
                
            } catch (error) {
                console.error("Canvas toDataURL failed", error);
                alert('画像のエクスポートに失敗しました。');
            }
        };

        img.onerror = (e) => {
            console.error("Image load error", e);
            alert('SVG画像の読み込みに失敗しました。');
        };

        img.src = url;
    });
});
