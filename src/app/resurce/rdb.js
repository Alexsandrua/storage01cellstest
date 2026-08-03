export default async function temporareStor() {
    const workr = {
        tokens: {
            token: { // це приклад для редагування
                nameOne: '',
                nameTwo: '',
                password: '',

            }
        },
        match: { // данні завантажуються з основної ьази зразу після її оновлення
            name: 'name',//це окрема комірка тількі для читання
            name_name: 'name_name',// name_name - _name це она коміркв подвійне ім!я для редагування
            _name: 'name_name'//імʼя для читання
        }
    }
}

