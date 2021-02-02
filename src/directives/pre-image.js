import baseUrl from '../assets/imgBaseUrl';
/**
 * 判斷圖片是否存在
 */
function imageIsExist(el, url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            if (img.complete) {
                resolve(true);
                img.remove();
            }
        };
        img.onerror = () => {
            resolve(false);
            img.remove();
        };
        img.src = url;
    });
}

function isBindingType(binding) {
    return typeof binding.value === 'string';
}

function isBindingCustomType(binding) {
    return typeof binding.value.imageURL === 'string';
}


// 圖片預載入
const preimg = new Image();
preimg.src = `${baseUrl}/images/loading.svg`;

preimg.onload = () => {
    if (preimg.complete) {
        preimg.remove();
    }
};

const errimg = new Image();
errimg.src = `${baseUrl}/images/error.svg`;

errimg.onload = () => {
    if (errimg.complete) {
        errimg.remove();
    }
};

// 網址正規表示法
const regexURL = /(?:https?):\/\/[a-zA-Z0-9-_,./]+/g;

// 是否為合法的URL: 符合時回傳URL ; 不符合時回傳原本值
function checkURL(url) {
    const imgURLRegEx = url.match(regexURL);
    return imgURLRegEx === null ? url : imgURLRegEx[0];
}

export default {
    bind: async (el, binding) => {
        // 預計顯示的圖片
        let imgURL = '';

        // 判斷圖片是否存在
        let isExistUrl = '';

        // 預載入圖片
        let preImgURL = `${baseUrl}/images/loading.svg`;

        // 失效圖片
        let errImgURL = `${baseUrl}/images/error.svg`;

        // 是否使用 css background-image 當背景
        let bgValue = 'src';

        if (!binding.value) return;

        // 只傳一個String
        if (isBindingType(binding)) {
            imgURL = checkURL(binding.value);
            isExistUrl = checkURL(binding.value);
        }

        // 傳參數
        if (isBindingCustomType(binding)) {
            imgURL = checkURL(binding.value.imageURL);
            isExistUrl = checkURL(binding.value.imageURL);

            // 自定義預載入圖片
            if (binding.value.preImageURL) {
                preImgURL = checkURL(binding.value.preImageURL);
            }

            // 自定義失效圖片
            if (binding.value.errorImageURL) {
                errImgURL = checkURL(binding.value.errorImageURL);
            }
        }

        // 使用 img src
        if (el.nodeName === 'IMG') {
            bgValue = 'src';
        }

        // 使用 css background-image
        if (el.nodeName !== 'IMG') {
            bgValue = 'style';
            if (preImgURL) preImgURL = `background-image: url("${preImgURL}")`;
            if (imgURL) imgURL = `background-image: url("${imgURL}")`;
            if (errImgURL) errImgURL = `background-image: url("${errImgURL}")`;
        }

        // 預載入圖片
        el.setAttribute(bgValue, preImgURL);

        if (imgURL) {
            const exist = await imageIsExist(el, isExistUrl);

            if (exist) {
                el.setAttribute(bgValue, imgURL);
            } else {
                el.setAttribute('data-invalidiamgeurl', imgURL);
                el.setAttribute(bgValue, errImgURL);
            }
        }

        // imgURL路徑為空時
        if (!imgURL) {
            el.setAttribute(bgValue, '');
        }
    },
};
