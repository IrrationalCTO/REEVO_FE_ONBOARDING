export class HudView {
 private readonly countEl: HTMLSpanElement
 private readonly areaEl: HTMLSpanElement
 

 constructor(parent: HTMLElement) {
    const root = document.createElement('div')
    root.className = 'hud'
    this.countEl = this.addField(root, 'Shapes')
    this.areaEl = this.addField(root, 'Area (px²)')
    parent.appendChild(root)
    }

 public update(count: number, area: number): void {
    this.countEl.textContent = String(count)
    this.areaEl.textContent = Math.round(area).toLocaleString()
 }

 private addField(root: HTMLElement, label: string): HTMLSpanElement {
    const tab = document.createElement('div')
    tab.className = 'hud-tab'
    const value = document.createElement('strong')
    value.textContent = '0'
    tab.append(`${label}: `, value)
    root.appendChild(tab)
    return value
}
}