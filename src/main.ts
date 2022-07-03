const pageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;

        const form = document.querySelector('form');
        if (form) {
            main();
            pageObserver.disconnect();
        }
    });
});

const ageObserver = new MutationObserver(([mutation]) => {
    console.log(mutation.target, (mutation.target as HTMLInputElement).value);
});

pageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
});

function main() {
    const form = document.querySelector('form') as HTMLFormElement;

    if (form) {
        form.addEventListener('change', (ev) => {
            console.log(ev.target, (ev.target as HTMLInputElement).value);
        });
    }

    ageObserver.observe(document.querySelector('input[name="age"') as Node, {
        attributes: true,
    });

    const btn = document.getElementById('automate') as HTMLButtonElement;
    btn.addEventListener('click', () => {
        console.log('automated');
        form.reset();
        (
            document.querySelector('input[id="last-name"]') as HTMLInputElement
        ).name = 'last-name';

        fillInput('input[name="first-name"]', 'James');
        fillInput('input[id="last-name"]', 'Bond');
        fillInput('select[name="country"]', 'Great Britain');
        fillInput('input[name="age"]', '37');
        (
            document.querySelector(
                'div[id="demo-simple-select"]'
            ) as HTMLDivElement
        ).innerHTML = '37';

        fillInput('input[name="comments"]', true);
        fillInput('input[name="offers"]', true);
        fillInput('input[id="push-email"]', true);
    });
}

function fillInput(querySelector: string, value: string | boolean) {
    const element = document.querySelector(querySelector);
    if (element) {
        const el = element as HTMLInputElement;
        if (typeof value === 'string') {
            el.value = value;
        } else {
            el.checked = value;
        }
    }
}
