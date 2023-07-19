const dayMilliseconds = 24 * 60 * 60 * 1000;
class ConGraph {
    //конструктор
    constructor(objData) {
        //данные из json
        this.data = objData


        let cg = this.getContibutionGraph();
        let sideTextBox = document.createElement('div')
        sideTextBox.classList.add("side_text_box")
        let boardWrapper = document.createElement("div");
        boardWrapper.append(sideTextBox)
        boardWrapper.append(this.getBoard())

        boardWrapper.classList.add('board_wrapper')
        let headerText = document.createElement('div')
        headerText.classList.add('header_text')
        headerText.append()
        cg.append(headerText)
        cg.append(boardWrapper)
        cg.append(this.createBlocks())
        document.querySelector('contributionGraph').append(cg);
        sideTextBox.append(document.createElement('p').textContent = document.querySelectorAll(".cell")[0].dataset.weekDay)
        sideTextBox.append(document.createElement('p'))
        sideTextBox.append(document.createElement('p').textContent = document.querySelectorAll(".cell")[2].dataset.weekDay)
        sideTextBox.append(document.createElement('p'))
        sideTextBox.append(document.createElement('p').textContent = document.querySelectorAll(".cell")[4].dataset.weekDay)
        for (let i = 0; i < 12; i++) {
            headerText.append(document.createElement('p').textContent = document.querySelectorAll(".cell")[31*i].dataset.month)
        }
    }
    getContibutionGraph() {
        let cgWrapper = document.createElement('div');
        cgWrapper.classList.add('cg_wrapper')
        return cgWrapper

    }
    сreate
    createBlocks() {
        let list = document.createElement('div');
        list.classList.add("blocks")
        list.append(document.createElement('p'))
        list.append(this.createCell("c0", 1686750019399, 0, false, "No contributions"))
        list.append(this.createCell("c1-9", 1686750019399, 1, false, "1-9 contributions"))
        list.append(this.createCell("c10-19", 1686750019399, 10, false, "10-19 contributions"))
        list.append(this.createCell("c20-29", 1686750019399, 20, false, "20-29 contributions"))
        list.append(this.createCell("c30", 1686750019399, 30, false, "30+ contributions"))
        list.append(document.createElement('p'))
        list.childNodes[0].textContent = "Меньше"
        list.childNodes[6].textContent = "Больше"
        return list
    }
    // создаёт ячейки
    getBoard() {
        var currentDate = new Date();
        // все дни внутри дива
        let board = document.createElement('div');
        board.className = "board"
        for (let i = 350; i >= 0.; i--) {
            //получаем дату = текущая дата - i дней
            let d = new Date().setTime(currentDate.getTime() - (dayMilliseconds * i))
            //базовый цвет
            let colorClass = "c0";
            let count = 0;
            //если в этот день что то было, то:
            if (this.getDateFormat(d) in this.data) {
                //определяем цвет через фунцию getColorClassFromCount
                count = this.data[this.getDateFormat(d)];
                colorClass = this.getColorClassFromCount(count)
            }
            //получаем ячейку
            let cell = this.createCell(colorClass, d, count)
            board.append(cell)
        }
        return board

    }
    createCell(colorClass, dNumber, count, second = true, text) {
        var days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        var month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        //обертка для того чтобы реализовать hover и selected эффекты
        let wrapper = document.createElement('div');
        wrapper.className = "cell_wrapper"
        let firstText = ""
        if (!text) {
            firstText = count + " contributions"
        } else {
            firstText = text
        }
        let prompt;
        if (second) {
            let secondText = days[new Date(dNumber).getDay()] + ", " + month[new Date(dNumber).getMonth()] + " " + new Date(dNumber).getDate() + ", " + new Date(dNumber).getFullYear()
            prompt = this.createPrompt(firstText, secondText);
        } else {
            prompt = this.createPrompt(firstText);
            prompt.classList.add('prompt-lite')
        }
        wrapper.append(prompt);
        //создаём  ячейку
        let cell = document.createElement('div');
        //даём общий класс
        cell.classList.add("cell")
        //указываем цвет
        cell.classList.add(colorClass)
        //указываем дату в качестве айди
        cell.id = this.getDateFormat(dNumber)
        //указываем день недели
        cell.dataset.weekDay = days[new Date(dNumber).getDay()]
        cell.dataset.month = month[new Date(dNumber).getMonth()]
        //добавить слушатель наведения и выбора
        wrapper.append(cell)
        wrapper.addEventListener("click", (e) => {
            document.querySelectorAll("div.prompt").forEach(el => {
                if (el.classList.contains("prompt_active")) el.classList.remove("prompt_active")
            })
            e.target.parentNode.childNodes[0].classList.add("prompt_active")
        })
        return wrapper
    }
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
    createPrompt(firstText, secondText) {
        //выпадающая подсказка при клике на элемент
        let prompt = document.createElement('div'),
            promptTextContribution = document.createElement('p');
        prompt.classList.add("prompt")
        promptTextContribution.textContent = firstText;
        prompt.append(promptTextContribution);
        if (secondText) {
            let promptTextDate = document.createElement('p');
            promptTextDate.textContent = secondText;
            prompt.append(promptTextDate);
        } else {
            prompt.classList.add("lite")
        }
        return prompt;
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
