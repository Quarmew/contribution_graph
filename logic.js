let p = document.querySelector('#p');
p.textContent = "1";
const dayMilliseconds = 24 * 60 * 60 * 1000;


class ConGraph {
    constructor(objData) {
        this.data = objData
        this.colors = { "c0": [], "c1-9": [], "c10-19": [], "c20-29": [], "c30": [] }
        for (let key in this.data) {
            let count = this.data[key]
            if (count > 29) this.colors["c30"].push(key);
            if (count > 19 && count < 30) this.colors["c20-29"].push(key);
            if (count > 9 && count < 20) this.colors["c10-19"].push(key);
            if (count > 0 && count < 10) this.colors["c1-9"].push(key);
            if (count == 0) this.colors["c0"].push(key);
        }

        this.getBoard();
    }
    getBoard() {
        var currentDate = new Date();
        let board = document.createElement('div');
        for (let i = 0; i > -351.; i--) {
            let d = new Date().setTime(currentDate.getTime() - (dayMilliseconds * i * -1))
            console.log(this.getDateFormat(d))
            if (this.getDateFormat(d) in this.data) {
                console.log('yes ' + this.data[this.getDateFormat(d)])
            } else console.log('no')
            let cell = document.createElement('div');
            cell.className = "red";
            board.append(cell)
        }
        p.append(board);
    }
    getDateFormat(dNumber) {
        let date = new Date(dNumber);
        let month = date.getMonth();
        if(month.toString().length == 1) month = "0" + month
        return date.getFullYear() + "-" + month + "-" + date.getDate()
    }
    getColorClassFromCount(count) {
        if (count > 29) return "c30";
        if (count > 19 && count < 30) return "c20-29";
        if (count > 9 && count < 20) return "c10-19";
        if (count > 0 && count < 10) return "c1-9";
        if (count == 0) return "c0";
    }
}
(async () => {
    let response = await fetch("https://dpg.gg/test/calendar.json");
    if (response.ok) {
        let json = await response.json();
        let cg = new ConGraph(json);
        console.log()
    } else {
        console.log("ERRROR")
    }
})()
