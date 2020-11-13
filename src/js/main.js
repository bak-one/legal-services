window.addEventListener('DOMContentLoaded', () => {
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
        onLinkClick(link) {
            link.forEach((el) => {
                el.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    const offsetTop = document.querySelector(href).offsetTop;

                    e.preventDefault();
                    scroll({
                        top: offsetTop,
                        behavior: 'smooth',
                    });
                });
            });
        },
        onLinksClickHandler() {
            const navLinks = document.querySelectorAll('.nav__link');
            const orderBtn = document.querySelectorAll('.services-block .main-button');
            this.onLinkClick(navLinks);
            this.onLinkClick(orderBtn);
        },
        webpIsSupported(callback){
            const webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
            
            if(!window.createImageBitmap){
                callback(false);
                return;
            }
            
            fetch(webpdata).then(function(response){
                return response.blob();
            }).then(function(blob){
                createImageBitmap(blob).then(function(){
                    callback(true);
                }, function(){
                    callback(false);
                });
            });
        },
        webpHandler() {
            const introBlock = document.querySelector('.intro-block');
            const contactBlock = document.querySelector('.contact');
            
            this.webpIsSupported(function(isSupported){
                if(!isSupported){
                    introBlock.classList.add('intro-block_no-webp');
                    contactBlock.classList.add('contact-block_no-webp');
                }
            });
        },
        hideLandBlock(windowWidth, inited, langBlock) {
            let windowOffset = window.pageYOffset;
            if(windowWidth <= 768 && windowOffset < 200) {
                if(!inited) {
                    langBlock.classList.add('lang-block--show');
                    inited = true;
                }
            } else {
                langBlock.classList.remove('lang-block--show');
                inited = false;
            }
        },
        hideLandBlockHandler() {
            const langBlock = document.querySelector('.lang-block');
            const windowWidth = window.innerWidth;
            let inited = false;
            
            this.hideLandBlock(windowWidth, inited, langBlock);
            
            window.addEventListener('scroll', () => {
                this.hideLandBlock(windowWidth, inited, langBlock);
            });
            
        },
        init() {
            this.webpHandler();
            this.onNavBtnClick();
            this.onLinksClickHandler();
            this.hideLandBlockHandler();
        },
    };
    
    const Accordion = {
        settings: {
            firstExpanded: false,
            toggle: true,
        },
    
        openAccordion(toggle, content) {
            if (content.children.length) {
                toggle.classList.add('is-open');
                let finalHeight = Math.floor(content.children[0].offsetHeight);
                content.style.height = finalHeight + 'px';
            }
        },
    
        closeAccordion(toggle, content) {
            toggle.classList.remove('is-open');
            content.style.height = 0;
        },
    
        accordionDesktopInit() {
            let accordion = document.querySelector('.work-arias-tabs__header');
            let items = accordion.querySelectorAll('.work-arias-tabs__item');
            let title = accordion.querySelectorAll('.work-arias-tabs__link');
            let tabsList = document.querySelector('.work-arias-tabs__list');
            let tabsListHeight = document.querySelector('.work-arias-tabs__list').offsetHeight;
            let contentHeight;
            let activeItem;
            let panel;
    
            title.forEach((el, index) => {
                if (index === 0) {
                    el.parentNode.classList.add('active-item');
                }
    
                el.addEventListener('click', function () {
                    let thisItem = this.parentNode;
    
                    items.forEach((item) => {
                        if (thisItem == item) {
                            activeItem = accordion.querySelector('.active-item');
    
                            if (activeItem) {
                                activeItem.classList.remove('active-item');
                            }
    
                            thisItem.classList.add('active-item');
    
                            panel = thisItem.querySelector('.work-arias-tabs__content');
                            contentHeight = panel.offsetHeight;
    
                            if (contentHeight > tabsListHeight) {
                                tabsList.setAttribute('style', `height: ${contentHeight}px`);
                            } else {
                                tabsList.style = null;
                            }
                        }
                    });
                });
            });
        },
    
        accordionMobileInit(el) {
            const sections = el.getElementsByClassName('work-arias-tabs__item');
            const allToggles = el.getElementsByClassName('work-arias-tabs__link');
            const allContents = el.getElementsByClassName('work-arias-tabs__content');
            let isFirstExpanded = this.settings.firstExpanded;
            let isToggle = this.settings.toggle;
            
            if (el.classList.contains('is-first-expanded')) {
                isFirstExpanded = true;
            }
            
            if (el.classList.contains('is-toggle')) {
                isToggle = true;
            }
    
            for (let i = 0; i < sections.length; i++) {
                const toggle = allToggles[i];
                const content = allContents[i];
    
                toggle.addEventListener('click', () => {
                    if (!isToggle) {
                        for (let a = 0; a < allContents.length; a++) {
                            this.closeAccordion(allToggles[a], allContents[a]);
                        }
                        this.openAccordion(toggle, content);
                    } else {
                        if (toggle.classList.contains('is-open')) {
                            this.closeAccordion(toggle, content);
                        } else {
                            this.openAccordion(toggle, content);
                        }
                    }
                });
    
                if (i === 0 && isFirstExpanded) {
                    this.openAccordion(toggle, content);
                }
            }
        },
    
        init() {
            const windowWidth = window.innerWidth;
    
            if (windowWidth > 991) {
                this.accordionDesktopInit();
            } else {
                const accordions = document.getElementsByClassName('work-arias-tabs__list');
    
                for (let i = 0; i < accordions.length; i++) {
                    this.accordionMobileInit(accordions[i]);
                }
            }
        },
    };
    
    Accordion.init();
    layerSite.init();
});