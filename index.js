const listItem = ['bau', 'cua', 'tom', 'ca', 'huou', 'ga']
// Tạo UI cho các thẻ ảnh
const cardItemBox = document.getElementById('card-item-box')

listItem.forEach((item) => {
    cardItemBox.innerHTML += `
        <div class="card-item">
            <p>0</p>
            <img src="./images/${item}.png" alt="#">
        </div>
    `
})

const rollImage = document.getElementById('roll-image')
for (let i = 0; i < 3; i++) {
    rollImage.innerHTML += `
        <div class="roll-image-item">
            <img src="./images/bau.png" alt="#">
        </div>
    `
}


// Quay random hình
const roll = document.getElementById('roll')
const setUp = document.getElementById('set-up')

roll.addEventListener('click', () => {
    const messErr = document.getElementById('mess-err')
    if (count < 3) {
        messErr.style.visibility = 'visible'
        return
    }
    messErr.style.visibility = 'hidden'
    rollRandom()
})

const choiceArr = [0, 0, 0]
let choiceCompare = [0, 0, 0]
let arrChoice = []
let arrChoiceCount = []
let count = 0


const rollRandom = () => {
    roll.disabled = true
    setUp.disabled = true
    const interval = setInterval(() => {
        const imageRoll = document.querySelectorAll('.roll-image-item img')

        imageRoll.forEach((ele, index) => {
            const randomIndex = Math.floor(Math.random() * 6)
            ele.src = `./images/${listItem[randomIndex]}.png`
            choiceArr[index] = randomIndex
        })
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        roll.disabled = false
        setUp.disabled = false
        if (JSON.stringify(choiceArr) === JSON.stringify(choiceCompare)) {
            console.log('Bạn đã đoán đúng với dự đoán:', getResult());
        } else {
            console.log('Bạn đã đoán sai với dự đoán:', getResult());
        }
    }, 5000)
}
const getResult = () => {
    let result = ''
    arrChoiceCount.forEach((item) => {
        result += ` ${item.value} ${item.count}`
    })
    return result
}

// Xử lí click chọn tăng sô lương đặt cửa

const countList = document.querySelectorAll('.card-item p')
const card = document.querySelectorAll('.card-item')

card.forEach((ele, index) => {
    ele.addEventListener('click', () => {
        if (count === 3) return
        let currentCount = +countList[index].innerHTML
        countList[index].innerHTML = `${currentCount + 1}`
        choiceCompare[count] = index
        if (!arrChoice.includes(index)) {
            arrChoice.push(index)
            arrChoiceCount.push({
                value: listItem[index],
                count: 1
            })
        } else {
            arrChoiceCount[arrChoice.indexOf(index)].count++
        }
        count++
    })
})


//setup lại giá trị
setUp.addEventListener('click', () => {
    reseValue()
    countList.forEach(ele => {
        ele.innerHTML = `0`
    })
})

const reseValue = () => {
    count = 0
    choiceCompare = [0, 0, 0]
    arrChoice = []
    arrChoiceCount = []
}