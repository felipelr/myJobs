export const formatPhone = (phone) => {
    if (phone.length > 0) {
        let replaced = phone.split('(').join('')
        replaced = replaced.split(')').join('')
        replaced = replaced.split('-').join('')
        replaced = replaced.split(' ').join('')
        if (replaced.length > 10) {
            let formatted = replaced.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3')
            return formatted
        }
        else if (replaced.length > 6) {
            let formatted = replaced.replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, '($1) $2-$3')
            return formatted
        }
        else if (replaced.length > 2) {
            let formatted = replaced.replace(/^(\d{2})(\d{0,4}).*/, '($1) $2')
            return formatted
        }
        else if (replaced.length > 0) {
            let formatted = replaced.replace(/^(\d*)/, '($1')
            return formatted
        }
    }
    return phone
}

export const formatDate = (date) => {
    if (date.length > 0) {
        let replaced = date.split('/').join('')
        if (replaced.length > 4) {
            let formatted = replaced.replace(/^(\d{2})(\d{0,2})(\d{0,4}).*/, '$1/$2/$3')
            return formatted
        }
        else if (replaced.length > 2) {
            let formatted = replaced.replace(/^(\d{2})(\d{0,2}).*/, '$1/$2')
            return formatted
        }
        else {
            let formatted = replaced.replace(/^(\d*)/, '$1')
            return formatted
        }
    }
    return date
}