import axios from 'axios'
import { urlMyJobsAPI } from '../config/config'

export const changePassword = async (dados) => {
    try {
        const postRequest = await axios.post(`${urlMyJobsAPI}/users/change_password.json`,
            {
                id: dados.user.id,
                currentPassword: dados.currentPassword,
                newPassword: dados.newPassword,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + dados.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        const { data } = postRequest

        if (data.error) {
            return data.errorMessage
        }

        return "success"
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        return messageError
    }
}