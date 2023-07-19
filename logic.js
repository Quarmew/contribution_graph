let p = document.querySelector('#p');
p.textContent = "1";
let board = document.createElement('div');
for (let i = 0; i < 5; i++) {
    let cell = document.createElement('div');
    cell.className = "red";
    board.append(cell)
}
p.append(board);

class ConGraph {
    constructor(objData) {
        this.data = objData
        this.colors = { "#EDEDED": [], "#ACD5А2": [], "#7FA8C9": [], "#527BA0": [], "#254E77": [] }
        for (let key in this.data) {
            let count = this.data[key]
            if (count > 29) this.colors["#254E77"].push(key);
            if (count > 19 && count < 30) this.colors["#527BA0"].push(key);
            if (count > 9 && count < 20) this.colors["#7FA8C9"].push(key);
            if (count > 0 && count < 10) this.colors["#ACD5А2"].push(key);
            if (count == 0) this.colors["#EDEDED"].push(key);
        }
        console.log(this.colors)
    }

}
(async () => {
    let response = await fetch("https://dpg.gg/test/calendar.json");
    if (response.ok) {
        let json = await response.json();
        let cg = new ConGraph(json);
    } else {
        console.log("ERRROR")
    }
})()
