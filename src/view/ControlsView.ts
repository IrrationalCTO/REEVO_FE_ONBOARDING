export class ControlsView {
    private readonly root: HTMLDivElement

    constructor(parent: HTMLElement) {
        this.root = document.createElement('div')
        this.root.className = 'controls'
        parent.appendChild(this.root)
    }

    public addControl(label: string, initial: number, onStep: (direction: 1 | -1) => number, decimals = 0): void {
        const row = document.createElement('div')
        row.className = 'control-row'

        const name = document.createElement('span')
        name.textContent = label

        const value = document.createElement('span')
        value.className = 'control-value'
        const show = (v: number) => { value.textContent = v.toFixed(decimals) }
        show(initial)

        const minus = this.createButton('−', `Decrease ${label}`, () => show(onStep(-1)))
        const plus = this.createButton('+', `Increase ${label}`, () => show(onStep(1)))

        row.append(name, minus, value, plus)
        this.root.appendChild(row)
    }

    private createButton(text: string, ariaLabel: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = text
        button.setAttribute('aria-label', ariaLabel)
        button.addEventListener('click', onClick)
        return button
    }
}