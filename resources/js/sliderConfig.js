;
(function (global) {
    var AnimationHandle, cancelAnimation = global['cancelRequestAnimationFrame'] || global['cancelAnimationFrame'];
    global.iSliderConfig = {
        isVertical: true,
//        animateType: 'flip',
        animateTime: 300,
        animateEasing: 'ease',
        onslidestart: function () {
            if (AnimationHandle) {
                cancelAnimation(AnimationHandle);
                AnimationHandle = null;
            }
        },
        onslidechange: function (index, dom) {
            $(dom).find('.content').empty();
            $(dom).find('.title').hide();
        },
        onslidechanged: function (index, dom, instance) {
            var oldDis = document.getElementById('sliderIcon').style.display;
            if (index === (list.length - 1)) {
                document.getElementById('sliderIcon').style.display = 'none';
            } else if (oldDis === 'none') {
                document.getElementById('sliderIcon').style.display = 'block';
            }
            if (index > 0) {
                $(dom).find('.title').fadeIn(200);
                var el = $(dom).find('.content'),
                    messages = instance.data[index].messages.slice(),
                    speed = 9,
                    index,
                    appendMessage = function () {
                        if (index == 0) {
                            $('<div class="message">' + messages.shift() + '</div>').appendTo(el);
                            index = speed;
                        } else {
                            index--;
                        }
                        if (messages.length > 0) {
                            AnimationHandle = global.requestAnimationFrame(appendMessage);
                        } else {
                            AnimationHandle = null;
                        }
                    };
                el.html('');
                AnimationHandle = global.requestAnimationFrame(appendMessage);
            }
        }
    }
})(window);