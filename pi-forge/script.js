document.querySelectorAll('header nav ul').forEach((ul) => {
    ul.addEventListener('click', () => {
        const nav = ul.closest('nav');
        const checkbox = nav?.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = false;
    });
});

window.addEventListener('scroll', () => {
    const firstNav = document.querySelector('header nav:first-of-type');
    if (!firstNav) return;
    if (window.scrollY >= window.innerHeight / 8) {
        firstNav.classList.add('hiddenNav');
    } else {
        firstNav.classList.remove('hiddenNav');
    }
});

(() => {
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const showWhenNear = (nodes, extra) => {
        if (!nodes.length) return;
        if (quiet || !('IntersectionObserver' in window)) {
            nodes.forEach((el) => {
                el.classList.add('is-shown');
                extra?.(el);
            });
            return;
        }

        const watch = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-shown');
                    extra?.(entry.target);
                    watch.unobserve(entry.target);
                });
            },
            { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
        );

        nodes.forEach((el) => watch.observe(el));
    };

    showWhenNear([...document.querySelectorAll('.forge-in')]);

    const title = document.querySelector('[data-word-in]');
    const whoTitle = document.querySelector('[data-line-in]');

    const armOnce = (el, cls, amount) => {
        if (!el) return;
        if (quiet || !('IntersectionObserver' in window)) {
            el.classList.add(cls);
            return;
        }
        const watch = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    el.classList.add(cls);
                    watch.unobserve(el);
                });
            },
            { threshold: amount }
        );
        watch.observe(el);
    };

    armOnce(title, 'is-ready', 0.4);
    armOnce(whoTitle, 'is-ready', 0.35);

    const tabBar = document.querySelector('[data-switch]');
    if (tabBar) {
        const buttons = [...tabBar.querySelectorAll('[data-switch-id]')];
        const panes = [...document.querySelectorAll('[data-pane]')];

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.switchId;
                buttons.forEach((item) => {
                    const on = item === btn;
                    item.classList.toggle('is-on', on);
                    item.setAttribute('aria-selected', String(on));
                });
                panes.forEach((pane) => {
                    const on = pane.dataset.pane === id;
                    pane.classList.toggle('is-on', on);
                    pane.hidden = !on;
                });
            });
        });
    }

    const capNav = document.querySelector('[data-cap-nav]');
    const capButtons = capNav ? [...capNav.querySelectorAll('[data-jump]')] : [];
    const capBlocks = [...document.querySelectorAll('[data-cap]')];

    const paintCap = (id) => {
        capButtons.forEach((btn) => {
            btn.classList.toggle('is-on', btn.dataset.jump === id);
        });
    };

    capButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const block = document.querySelector(`[data-cap="${btn.dataset.jump}"]`);
            if (!block) return;
            paintCap(btn.dataset.jump);
            block.scrollIntoView({ behavior: quiet ? 'auto' : 'smooth', block: 'start' });
        });
    });

    if (capBlocks.length && 'IntersectionObserver' in window) {
        const spy = new IntersectionObserver(
            (entries) => {
                const seen = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (!seen.length) return;
                paintCap(seen[0].target.dataset.cap);
            },
            { threshold: [0.3, 0.55], rootMargin: '-18% 0px -42% 0px' }
        );
        capBlocks.forEach((block) => spy.observe(block));
    }

    const line = document.querySelector('[data-prompt-line]');
    const prompts = [
        'Compare cloud and on-premises options',
        'Build a connected thermal workflow',
        'Open Flow only for the CFD group',
    ];

    if (line) {
        if (quiet) {
            line.textContent = prompts[0];
        } else {
            let which = 0;
            let at = 0;
            let erasing = false;

            const step = () => {
                const current = prompts[which];
                line.textContent = current.slice(0, at);

                if (!erasing && at < current.length) {
                    at += 1;
                    window.setTimeout(step, 72);
                    return;
                }
                if (erasing && at > 0) {
                    at -= 1;
                    window.setTimeout(step, 36);
                    return;
                }
                erasing = !erasing;
                if (!erasing) which = (which + 1) % prompts.length;
                window.setTimeout(step, 1200);
            };

            step();
        }
    }

    const fillRoot = document.querySelector('[data-ink-fill]');
    if (fillRoot) {
        const source = fillRoot.textContent.trim().replace(/\s+/g, ' ');
        fillRoot.textContent = '';
        const marks = [];

        source.split(' ').forEach((word, index, all) => {
            const wrap = document.createElement('span');
            wrap.className = 'forge-word';
            [...word].forEach((ch) => {
                const bit = document.createElement('span');
                bit.className = 'forge-ch';
                bit.textContent = ch;
                wrap.appendChild(bit);
                marks.push(bit);
            });
            if (index < all.length - 1) {
                const gap = document.createElement('span');
                gap.className = 'forge-ch';
                gap.innerHTML = '&nbsp;';
                wrap.appendChild(gap);
                marks.push(gap);
            }
            fillRoot.appendChild(wrap);
        });

        const band = fillRoot.closest('.forge-statement') || fillRoot;
        let waiting = false;

        const paint = () => {
            waiting = false;
            const box = band.getBoundingClientRect();
            const view = window.innerHeight || 1;
            const begin = view * 0.82;
            const stop = view * 0.18;
            const ratio = Math.min(1, Math.max(0, (begin - box.top) / (begin - stop + box.height * 0.4)));
            const exact = ratio * marks.length;
            const filled = Math.floor(exact);
            const leftover = exact - filled;

            marks.forEach((mark, i) => {
                mark.classList.remove('is-on', 'is-half');
                if (i < filled) mark.classList.add('is-on');
                else if (i === filled && leftover > 0.2) {
                    mark.classList.add(leftover > 0.6 ? 'is-on' : 'is-half');
                }
            });
        };

        const onMove = () => {
            if (waiting) return;
            waiting = true;
            requestAnimationFrame(paint);
        };

        window.addEventListener('scroll', onMove, { passive: true });
        window.addEventListener('resize', onMove);
        paint();
    }
})();
