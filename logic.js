let p = document.querySelector('#p');
p.textContent = "1";
const dayMilliseconds = 24 * 60 * 60 * 1000;


class ConGraph {
    //конструктор
    constructor(objData) {
        //данные из json
        this.data = objData
        //пока не используется
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
    // создаёт дни
    getBoard() {
        var currentDate = new Date();
        // все дни внутри дива
        let board = document.createElement('div');
        board.className = "board"
        for (let i = 351; i > 0.; i--) {
            //получаем дату = текущая дата - i дней
            let d = new Date().setTime(currentDate.getTime() - (dayMilliseconds * i))
            //создаём базовые ячейки
            let cell = document.createElement('div');
            cell.classList.add("cell")
            let colorClass = "c0";
            //если в этот день что то было, то:
            if (this.getDateFormat(d) in this.data) {
                //определяем цвет через фунцию getColorClassFromCount
                let count = this.data[this.getDateFormat(d)];
                colorClass = this.getColorClassFromCount(count)
            } else colorClass = "c0";
            //вешаем класс цвета
            cell.classList.add(colorClass)
            //указывает дату в айди чтобы можно было найти
            cell.id = this.getDateFormat(d)
            //добавить слушатель наведения и выбора
            board.append(cell)
        }
        p.append(board);
    }
    getCell() { }
    getDateFormat(dNumber) {
        //передаём число - получаем дату формата из JSON
        let date = new Date(dNumber);
        let month = date.getMonth();
        if (month.toString().length == 1) month = "0" + month
        return date.getFullYear() + "-" + month + "-" + date.getDate()
    }
    getColorClassFromCount(count) {
        //выбираем цвет по числу контрибуций
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
