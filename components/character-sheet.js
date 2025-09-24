class CharacterSheet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/character-sheet.css">
            <div class="character-sheet">
                <h3 class="character-name">Character Name</h3>
                <div class="character-stats">
                    <div class="stat">
                        <strong>Level</strong>
                        <span>1</span>
                    </div>
                    <div class="stat">
                        <strong>Class</strong>
                        <span>Wizard</span>
                    </div>
                    <div class="stat">
                        <strong>Race</strong>
                        <span>Elf</span>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('character-sheet', CharacterSheet);
