document.addEventListener('DOMContentLoaded', function (e) {
    
    let accordion = document.querySelector('.work-arias-tabs__header');
    let items = accordion.querySelectorAll('.work-arias-tabs__item');
    let title = accordion.querySelectorAll('.work-arias-tabs__link');
    // let content = accordion.querySelectorAll('.work-arias-tabs__link');
    let tabsList = document.querySelector('.work-arias-tabs__list');
    let tabsListHeight = document.querySelector('.work-arias-tabs__list').offsetHeight;
    let contentHeight;
  
    function toggleAccordion() {
        let thisItem = this.parentNode;

        items.forEach(item => {
            if (thisItem == item) {
                // if this item is equal to the clicked item, open it.
                thisItem.classList.add('active-item');
                var panel = thisItem.querySelector('.work-arias-tabs__content');
                contentHeight = panel.offsetHeight;
                console.log(item);
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
              
                if(contentHeight > tabsListHeight) {
                    tabsList.setAttribute('style', `height: ${contentHeight}px`);
                } else {
                    tabsList.setAttribute('style', '');
                }
              
                return;
            }
            // otherwise, remove the open class
            item.classList.remove('active-item');
            // item.querySelector('.work-arias-tabs__content').setAttribute('style', `max-height:0`);
        });
    }
  
  

  
    function mob() {
        var acc = document.getElementsByClassName('work-arias-tabs__link');
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', function () {
                this.parentElement.classList.toggle('active-item');
                var panel = this.nextElementSibling;
              
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            });
        }
    }
  
    if(window.innerWidth > 768) {
        title.forEach(question => question.addEventListener('click', toggleAccordion));
    } else {
        mob();
    }

});



const layerSite = {
    onNavBtnClick() {
        const navBtn = document.querySelector('.nav-btn');
        navBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('open');
            navBtn.classList.toggle('nav-btn_open');
            navBtn.parentElement.querySelector('.nav__list').classList.toggle('nav__list_open');
            navBtn.parentElement.querySelector('.header-time').classList.toggle('header-time_open');
        });
    },
    accordionInit() {
        $('a:not(.work-arias-tabs__link)').on('click', function (event) {
            if (this.hash !== '') {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 150,
                }, 800);
            }
        });
    },
    onMenuLinkClick() {
        var btnContainer = document.getElementById('nav');
        var btns = btnContainer.querySelectorAll('.nav__link');

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                this.className += ' active';
            });
        }
    },
    init() {
        this.onNavBtnClick();
        // this.accordionInit();
        this.onMenuLinkClick();
    },
};

layerSite.init();