class DiceRoller extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/dice-roller.css">
            <div class="dice-roller">
                <h3>Dice Roller</h3>
                <div class="dice-buttons">
                    <button data-dice="d4">d4</button>
                    <button data-dice="d6">d6</button>
                    <button data-dice="d8">d8</button>
                    <button data-dice="d10">d10</button>
                    <button data-dice="d12">d12</button>
                    <button data-dice="d20">d20</button>
                </div>
                <div class="roll-result"></div>
            </div>
        `;
    }
}

customElements.define('dice-roller', DiceRoller);
