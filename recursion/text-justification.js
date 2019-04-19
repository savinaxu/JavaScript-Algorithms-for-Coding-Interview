// Objec­tive:  Given a list of words and length L. Format the words so that each line will have only L characters and fully justified (left and right justified).

// Restrictions-

// You need to fit as many as words in every line.
// You are not allowed to split a word and put them in next line.
// Pad extra spaces ‘ ‘ if needed so that each line has L characters.
// Extra spaces between words should be distributed as evenly as possible. If even distribution is not possible then extra spaces will be assigned on the left most space (between two words).
// Assumption – Each word has length less than Length L.

//EXAMPLE:
// String = ["This", "is", "a", "text", "justification","problem","in","tutorial","horizon"];
// int length = 20;

// Output:
// This   is   a   text
// justification
// problem  in tutorial
// horizon
const addSpace = num => {
    let result = ""
    for (let i = 0; i < num; i++) {
        result += " "
    }
    return result
}

const TextJustification = (arr, l) => {
    let row = ""
    let mark = 0
    let result = ""

    for (let word of arr) {
        let len = word.length
        // word exact fits the row
        if (row.length + len === l) {
            row += word
            mark = 0
            row.replace("@", " ")
            if (word !== arr[arr.length - 1]) {
                result += row + "\n"
                row = ""
            } else {
                result += row
            }
        }
        if (row.length + len < l) {
            if (word !== arr[arr.length - 1]) {
                row += word + "@"
                mark++
            } else {
                row += word
                let extraSpace = l - row.length
                let evenSpaceNum = Math.floor(extraSpace / mark)
                let evenSpace = addSpace(evenSpaceNum)
                let leftSpaceNum = evenSpaceNum + (extraSpace - evenSpaceNum * mark)
                let leftSpace = addSpace(leftSpaceNum)
                row.replace("@", evenSpace)
                row[row.indexOf(evenSpace)] = leftSpace
                result += row
            }
        } else if (row.length + len > l) {
            row = row.slice(0, row.length - 1)
            mark--
            let totalSpace = l - row.length + mark
            if (mark > 0) {
                let evenSpaceNum = Math.floor(totalSpace / mark)
                let evenSpace = addSpace(evenSpaceNum)
                let leftSpaceNum = evenSpaceNum + (totalSpace - evenSpaceNum * mark)
                let leftSpace = addSpace(leftSpaceNum)
                row = row.replace(/@/gi, evenSpace)
                row[row.indexOf(evenSpace)] = leftSpace
            } else {
                row += addSpace(totalSpace)
            }

            result += row + "\n"
            row = ""
            mark = 0

            if (word !== arr[arr.length - 1]) {
                row = word + "@"
                mark++
            } else {
                result += word
            }
        }
    }

    return result
}

console.log(TextJustification(["This", "is", "a", "text", "justification", "problem", "in", "tutorial", "horizon"], 20))