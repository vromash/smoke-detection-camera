import axios from 'axios';

export const getStatistics = () => {
    axios.get('https://32690c512f80.ngrok.io/')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const getFrame = (frameId) => {
    axios.get(`http://localhost:3000/${frameId}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const postImage = (link) => {
    axios.post('http://dfad0c9808a0.ngrok.io/image', {
        url: link,
        print_output: 'True'
     }
    )
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const postVideo = (link) => {
    axios.post('http://localhost:3000/', {
        link }
    )
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}
